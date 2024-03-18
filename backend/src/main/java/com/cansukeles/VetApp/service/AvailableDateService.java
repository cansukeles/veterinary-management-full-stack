package com.cansukeles.VetApp.service;

import com.cansukeles.VetApp.dto.request.save.AvailableDateSaveRequest;
import com.cansukeles.VetApp.dto.request.update.AvailableDateUpdateRequest;
import com.cansukeles.VetApp.dto.response.AvailableDateResponse;
import com.cansukeles.VetApp.entities.AvailableDate;
import com.cansukeles.VetApp.entities.Doctor;
import com.cansukeles.VetApp.mapper.AvailableDateResponseMapper;
import com.cansukeles.VetApp.modelMapper.ModelMapperService;
import com.cansukeles.VetApp.repository.IAvailableDateRepo;
import com.cansukeles.VetApp.repository.IDoctorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvailableDateService {

    private final IAvailableDateRepo availableDateRepo;
    private final ModelMapperService modelMapperService;
    private final AvailableDateResponseMapper availableDateResponseMapper;
    private final IDoctorRepo doctorRepo;

    public List<AvailableDateResponse> findAll() {
        return availableDateRepo.findAll().stream().map(availableDateResponseMapper::apply).collect(Collectors.toList());
    }

    // Değerlendirme formu 25
    public AvailableDateResponse getById(Long id) {
        Optional<AvailableDate> optionalAvailableDate = availableDateRepo.findById(id);
        if (optionalAvailableDate.isPresent()) {
            return modelMapperService.forResponse().map(optionalAvailableDate.get(), AvailableDateResponse.class);
        } else {
            throw new RuntimeException("Available date not found with this id");
        }
    }

    // Değerlendirme formu 25
    public AvailableDateResponse create(AvailableDateSaveRequest availableDateSaveRequest) {
        Long doctorId = availableDateSaveRequest.getDoctor().getId();
        Optional<Doctor> optionalDoctor = doctorRepo.findById(doctorId);
        if (optionalDoctor.isEmpty()) {
            throw new RuntimeException("Doctor does not exist.");
        }

        Optional<AvailableDate> optionalAvailableDate = availableDateRepo.findByAvailableDate(availableDateSaveRequest.
                getAvailableDate());

        if (optionalAvailableDate.isPresent()) {
            AvailableDate availableDate = optionalAvailableDate.get();
            if (Objects.equals(availableDate.getDoctor().getId(), doctorId)) {
                throw new RuntimeException("Available date already exist for the given doctor.");
            }
        }

        AvailableDate availableDateToSave = availableDateRepo.save(modelMapperService.
                forRequest().map(availableDateSaveRequest, AvailableDate.class));

        Doctor doctor = optionalDoctor.get();
        availableDateToSave.setDoctor(doctor);

        return modelMapperService.forResponse().map(availableDateToSave, AvailableDateResponse.class);
    }

    public AvailableDateResponse update(AvailableDateUpdateRequest availableDateUpdateRequest) {
        this.getById(availableDateUpdateRequest.getId());
        return modelMapperService.forResponse().map(availableDateRepo.save(modelMapperService.forRequest().map(
                availableDateUpdateRequest, AvailableDate.class)), AvailableDateResponse.class);
    }

    // Değerlendirme formu 25
    public void delete(Long id) {
        Optional<AvailableDate> optionalAvailableDate = availableDateRepo.findById(id);
        if (!optionalAvailableDate.isPresent()) {
            throw new RuntimeException("Available Date doesn't exist");
        }
        AvailableDate availableDate = optionalAvailableDate.get();
        this.availableDateRepo.delete(availableDate);
    }
}
