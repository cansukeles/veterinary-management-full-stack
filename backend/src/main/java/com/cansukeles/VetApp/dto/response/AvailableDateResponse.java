package com.cansukeles.VetApp.dto.response;

import com.cansukeles.VetApp.entities.Doctor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvailableDateResponse {

    private Long id;
    private LocalDate availableDate;
    private Doctor doctor;
}
