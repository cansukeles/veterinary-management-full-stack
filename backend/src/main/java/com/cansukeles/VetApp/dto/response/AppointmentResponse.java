package com.cansukeles.VetApp.dto.response;

import com.cansukeles.VetApp.dto.AnimalDto;
import com.cansukeles.VetApp.dto.DoctorDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentResponse {
    private Long id;
    private LocalDateTime appointmentDate;
    private DoctorDto doctorDto;
    private AnimalDto animalDto;
}
