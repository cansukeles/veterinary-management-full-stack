package com.cansukeles.VetApp.dto.request.save;

import com.cansukeles.VetApp.entities.Doctor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvailableDateSaveRequest {

    private LocalDate availableDate;
    private Doctor doctor;
}
