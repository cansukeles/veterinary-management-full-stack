package com.cansukeles.VetApp.mapper;

import com.cansukeles.VetApp.dto.AnimalDto;
import com.cansukeles.VetApp.dto.CustomerDto;
import com.cansukeles.VetApp.dto.DoctorDto;
import com.cansukeles.VetApp.dto.response.AppointmentResponse;
import com.cansukeles.VetApp.entities.Appointment;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AppointmentResponseMapper implements Function<Appointment, AppointmentResponse> {

    @Override
    public AppointmentResponse apply(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getAppointmentDate(),
                new DoctorDto(
                        appointment.getDoctor().getId(),
                        appointment.getDoctor().getName(),
                        appointment.getDoctor().getPhone(),
                        appointment.getDoctor().getMail(),
                        appointment.getDoctor().getAddress(),
                        appointment.getDoctor().getCity()
                ),
                new AnimalDto(
                        appointment.getAnimal().getId(),
                        appointment.getAnimal().getName(),
                        appointment.getAnimal().getSpecies(),
                        appointment.getAnimal().getBreed(),
                        appointment.getAnimal().getGender(),
                        appointment.getAnimal().getColour(),
                        appointment.getAnimal().getDateOfBirth(),
                        new CustomerDto(
                                appointment.getAnimal().getCustomer().getId(),
                                appointment.getAnimal().getCustomer().getName(),
                                appointment.getAnimal().getCustomer().getPhone(),
                                appointment.getAnimal().getCustomer().getMail(),
                                appointment.getAnimal().getCustomer().getAddress(),
                                appointment.getAnimal().getCustomer().getCity()
                        )
                )
        );
    }
}
