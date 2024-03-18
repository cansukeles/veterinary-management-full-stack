package com.cansukeles.VetApp.service;

import com.cansukeles.VetApp.dto.request.save.AnimalSaveRequest;
import com.cansukeles.VetApp.dto.request.update.AnimalUpdateRequest;
import com.cansukeles.VetApp.dto.response.AnimalResponse;
import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Customer;
import com.cansukeles.VetApp.mapper.AnimalResponseMapper;
import com.cansukeles.VetApp.modelMapper.ModelMapperService;
import com.cansukeles.VetApp.repository.IAnimalRepo;
import com.cansukeles.VetApp.repository.ICustomerRepo;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.cansukeles.VetApp.specifications.AnimalSpecification.*;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final IAnimalRepo animalRepo;
    private final ICustomerRepo customerRepo;

    private final ModelMapperService modelMapperService;
    private final AnimalResponseMapper animalResponseMapper;

    // Değerlendirme formu 16
    public List<AnimalResponse> findAll(String nameLikeFilter) {
        Specification<Animal> filters = Specification.where(StringUtils.isBlank(nameLikeFilter) ?
                null : nameLike(nameLikeFilter));

        return animalRepo.findAll(filters)
                .stream()
                .map(animalResponseMapper::apply)
                .collect(Collectors.toList());
    }

    // // Değerlendirme formu 21
    public List<AnimalResponse> findAllByVaccineDates(LocalDate startDate, LocalDate endDate) {
        Specification<Animal> filters = Specification.where(
                (StringUtils.isBlank(startDate.toString()) && StringUtils.isBlank(endDate.toString())) ?
                        null : vaccineDateLike(startDate, endDate));

        return animalRepo.findAll(filters)
                .stream()
                .map(animalResponseMapper::apply)
                .collect(Collectors.toList());
    }

    // Değerlendirme formu 18
    public List<AnimalResponse> findAllAnimalsByCustomerName(String customerNameLikeFilter) {
        Specification<Animal> filters = Specification.where(StringUtils.isBlank(customerNameLikeFilter) ?
                null : customerNameLike(customerNameLikeFilter));

        return animalRepo.findAll(filters)
                .stream()
                .map(animalResponseMapper::apply)
                .collect(Collectors.toList());
    }

    // Değerlendirme formu 25
    public AnimalResponse getById(Long id) {
        Optional<Animal> optionalAnimal = animalRepo.findById(id);
        if (optionalAnimal.isPresent()) {
            return modelMapperService.forResponse().map(optionalAnimal.get(), AnimalResponse.class);
        } else {
            throw new RuntimeException("Animal not found with this id: " + id);
        }
    }

    // Değerlendirme formu 11
    // Değerlendirme formu 25
    public AnimalResponse create(AnimalSaveRequest animalRequest) {
        Optional<Animal> optionalAnimal = animalRepo.findByName(animalRequest.getName());
        if (optionalAnimal.isPresent()) {
            throw new RuntimeException("Animal already exist with this name: " + animalRequest.getName());
        }

        Optional<Customer> optionalCustomer = customerRepo.findById(animalRequest.getCustomer().getId());
        if (optionalCustomer.isEmpty()) {
            throw new RuntimeException("Customer does not exist");
        }

        Animal animal = animalRepo.save(modelMapperService.forRequest().map(animalRequest, Animal.class));

        Customer customer = optionalCustomer.get();
        animal.setCustomer(customer);

        return modelMapperService.forResponse().map(animal, AnimalResponse.class);
    }

    public AnimalResponse update(AnimalUpdateRequest animalUpdateRequest) {
        //If this id doesn't exist throw new exception
        this.getById(animalUpdateRequest.getId());
        return modelMapperService.forResponse().map(animalRepo.save(modelMapperService.forRequest()
                .map(animalUpdateRequest, Animal.class)), AnimalResponse.class);
    }

    // Değerlendirme formu 25
    public void delete(Long id) {
        Optional<Animal> optionalAnimal = animalRepo.findById(id);
        if (!optionalAnimal.isPresent()) {
            throw new RuntimeException("Animal doesn't exist");
        }
        Animal animal = optionalAnimal.get();
        this.animalRepo.delete(animal);
    }
}
