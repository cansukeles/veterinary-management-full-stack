package com.cansukeles.VetApp.mapper;

import com.cansukeles.VetApp.dto.response.DoctorResponse;
import org.springframework.stereotype.Service;
import com.cansukeles.VetApp.entities.Doctor;

import java.util.function.Function;

@Service
public class DoctorResponseMapper implements Function<Doctor, DoctorResponse> {
    @Override
    public DoctorResponse apply(Doctor doctor) {
        return new DoctorResponse(
                doctor.getId(),
                doctor.getName(),
                doctor.getPhone(),
                doctor.getMail(),
                doctor.getAddress(),
                doctor.getCity(),
                doctor.getAvailableDateList(),
                doctor.getAppointmentList()
        );
    }
}
