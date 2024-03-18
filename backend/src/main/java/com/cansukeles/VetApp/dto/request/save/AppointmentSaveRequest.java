package com.cansukeles.VetApp.dto.request.save;

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
public class AppointmentSaveRequest {

    private LocalDateTime appointmentDate;
    private Doctor doctor;
    private Animal animal;
}
