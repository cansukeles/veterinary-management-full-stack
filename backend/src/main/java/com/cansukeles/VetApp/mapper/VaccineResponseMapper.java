package com.cansukeles.VetApp.mapper;

import com.cansukeles.VetApp.dto.AnimalDto;
import com.cansukeles.VetApp.dto.AppointmentDto;
import com.cansukeles.VetApp.dto.CustomerDto;
import com.cansukeles.VetApp.dto.ReportDto;
import com.cansukeles.VetApp.dto.response.VaccineResponse;
import org.springframework.stereotype.Service;
import com.cansukeles.VetApp.entities.Vaccine;

import java.util.function.Function;

@Service
public class VaccineResponseMapper implements Function<Vaccine, VaccineResponse> {
    @Override
    public VaccineResponse apply(Vaccine vaccine) {
        return new VaccineResponse(
                vaccine.getId(),
                vaccine.getName(),
                vaccine.getCode(),
                vaccine.getProtectionStartDate(),
                vaccine.getProtectionFinishDate(),
                new AnimalDto(
                        vaccine.getAnimal().getId(),
                        vaccine.getAnimal().getName(),
                        vaccine.getAnimal().getSpecies(),
                        vaccine.getAnimal().getBreed(),
                        vaccine.getAnimal().getGender(),
                        vaccine.getAnimal().getColour(),
                        vaccine.getAnimal().getDateOfBirth(),
                        new CustomerDto(
                                vaccine.getAnimal().getCustomer().getId(),
                                vaccine.getAnimal().getCustomer().getName(),
                                vaccine.getAnimal().getCustomer().getPhone(),
                                vaccine.getAnimal().getCustomer().getMail(),
                                vaccine.getAnimal().getCustomer().getAddress(),
                                vaccine.getAnimal().getCustomer().getCity()

                        )
                ),
                vaccine.getReport() != null ? vaccine.getReport().getId() : null

        );
    }
}
