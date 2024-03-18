package com.cansukeles.VetApp.dto;

import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Doctor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDto {
    private Long id;
    private LocalDateTime appointmentDate;
    private DoctorDto doctorDto;
    private AnimalDto animalDto;
}
