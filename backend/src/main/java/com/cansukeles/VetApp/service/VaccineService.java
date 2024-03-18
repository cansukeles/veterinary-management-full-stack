package com.cansukeles.VetApp.service;

import com.cansukeles.VetApp.dto.request.save.VaccineSaveRequest;
import com.cansukeles.VetApp.dto.request.update.VaccineUpdateRequest;
import com.cansukeles.VetApp.dto.response.AppointmentResponse;
import com.cansukeles.VetApp.dto.response.VaccineResponse;
import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Appointment;
import com.cansukeles.VetApp.entities.Vaccine;
import com.cansukeles.VetApp.mapper.VaccineResponseMapper;
import com.cansukeles.VetApp.modelMapper.ModelMapperService;
import com.cansukeles.VetApp.repository.IAnimalRepo;
import com.cansukeles.VetApp.repository.IVaccineRepo;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.cansukeles.VetApp.specifications.VaccineSpecification.isBetweenDates;

@Service
@RequiredArgsConstructor
public class VaccineService {

    private final IVaccineRepo vaccineRepo;
    private final IAnimalRepo animalRepo;
    private final ModelMapperService modelMapperService;
    private final VaccineResponseMapper vaccineResponseMapper;

    public List<VaccineResponse> findAll() {
        return vaccineRepo.findAll().stream().map(vaccineResponseMapper::apply).collect(Collectors.toList());
    }

    public List<VaccineResponse> filterAllByDate(LocalDate startDate, LocalDate endDate) {
        Specification<Vaccine> filters = Specification.where(
                (StringUtils.isBlank(startDate.toString()) &&
                        StringUtils.isBlank(endDate.toString()) ?
                        null : isBetweenDates(startDate, endDate)));

        return vaccineRepo.findAll(filters)
                .stream()
                .map(vaccineResponseMapper::apply)
                .collect(Collectors.toList());
    }

    // Değerlendirme formu 25
    public VaccineResponse getById(Long id) {
        Optional<Vaccine> optionalVaccine = vaccineRepo.findById(id);
        if (optionalVaccine.isPresent()) {
            return modelMapperService.forResponse().map(optionalVaccine.get(), VaccineResponse.class);
        } else {
            throw new RuntimeException("Vaccine not found with this id: " + id);
        }
    }

    // Değerlendirme formu 20
    // Değerlendirme formu 25
    public List<VaccineResponse> getByAnimalId(Long id) {
        Optional<Animal> optionalAnimal = animalRepo.findById(id);
        if(optionalAnimal.isEmpty()) {
            throw new RuntimeException("Animal not found!");
        }

        Animal animal = optionalAnimal.get();
        return vaccineRepo.findByAnimal(animal).stream().map(vaccineResponseMapper::apply).collect((Collectors.toList()));
    }

    // Değerlendirme formu 15
    // Değerlendirme formu 19
    // Değerlendirme formu 25
    public VaccineResponse create(VaccineSaveRequest vaccineSaveRequest) {
        Optional<Animal> optionalAnimal = animalRepo.findById(vaccineSaveRequest.getAnimal().getId());
        if (optionalAnimal.isEmpty()) {
            throw new RuntimeException("Animal does not exist");
        }

        Optional<Vaccine> optionalVaccine = vaccineRepo.
                findByNameAndCodeAndAnimal(vaccineSaveRequest.getName(), vaccineSaveRequest.getCode(), vaccineSaveRequest.getAnimal());

        if (optionalVaccine.isPresent()) {
            LocalDate now = LocalDate.now();
            if(vaccineSaveRequest.getProtectionFinishDate().isAfter(now)) {
                throw new RuntimeException("Cannot create the same vaccine before it's finish date for this animal!");
            }
        }


        Vaccine vaccine = vaccineRepo.save(modelMapperService.forRequest().map(vaccineSaveRequest, Vaccine.class));

        Animal animal = optionalAnimal.get();
        vaccine.setAnimal(animal);

        return modelMapperService.forResponse().map(vaccine, VaccineResponse.class);
    }

    public VaccineResponse update(VaccineUpdateRequest vaccineUpdateRequest) {
        this.getById(vaccineUpdateRequest.getId());
        Vaccine vaccine = vaccineRepo.save(modelMapperService.forRequest().map(vaccineUpdateRequest, Vaccine.class));
        return modelMapperService.forResponse().map(vaccine, VaccineResponse.class);
    }

    // Değerlendirme formu 25
    public void delete(Long id) {
        Optional<Vaccine> optionalVaccine = vaccineRepo.findById(id);
        if (!optionalVaccine.isPresent()) {
            throw new RuntimeException("Vaccine doesn't exist");
        }
        Vaccine vaccine = optionalVaccine.get();
        this.vaccineRepo.delete(vaccine);
    }
}
