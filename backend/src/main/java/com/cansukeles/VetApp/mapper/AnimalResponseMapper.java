package com.cansukeles.VetApp.mapper;

import com.cansukeles.VetApp.dto.CustomerDto;
import com.cansukeles.VetApp.dto.response.AnimalResponse;

import java.util.function.Function;
import java.util.stream.Collectors;

import com.cansukeles.VetApp.entities.Animal;
import org.springframework.stereotype.Service;

@Service
public class AnimalResponseMapper implements Function<Animal, AnimalResponse> {
    @Override
    public AnimalResponse apply(Animal animal) {
        return new AnimalResponse(
                animal.getId(),
                animal.getName(),
                animal.getSpecies(),
                animal.getBreed(),
                animal.getGender(),
                animal.getColour(),
                animal.getDateOfBirth(),
                new CustomerDto(
                        animal.getCustomer().getId(),
                        animal.getCustomer().getName(),
                        animal.getCustomer().getPhone(),
                        animal.getCustomer().getMail(),
                        animal.getCustomer().getAddress(),
                        animal.getCustomer().getCity()
                )
        );
    }
}
