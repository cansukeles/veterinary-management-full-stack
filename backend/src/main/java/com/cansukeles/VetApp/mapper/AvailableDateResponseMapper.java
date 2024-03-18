package com.cansukeles.VetApp.mapper;

import com.cansukeles.VetApp.dto.response.AvailableDateResponse;
import com.cansukeles.VetApp.entities.AvailableDate;
import com.cansukeles.VetApp.entities.Doctor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
public class AvailableDateResponseMapper implements Function<AvailableDate, AvailableDateResponse> {
    @Override
    public AvailableDateResponse apply(AvailableDate availableDate) {
        return new AvailableDateResponse(
                availableDate.getId(),
                availableDate.getAvailableDate(),
                new Doctor(
                        availableDate.getDoctor().getId(),
                        availableDate.getDoctor().getName(),
                        availableDate.getDoctor().getPhone(),
                        availableDate.getDoctor().getMail(),
                        availableDate.getDoctor().getAddress(),
                        availableDate.getDoctor().getCity(),
                        availableDate.getDoctor().getAvailableDateList(),
                        availableDate.getDoctor().getAppointmentList()
                )
        );
    }
}
