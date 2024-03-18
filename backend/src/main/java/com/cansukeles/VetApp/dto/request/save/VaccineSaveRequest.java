package com.cansukeles.VetApp.dto.request.save;

import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Report;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaccineSaveRequest {
    private String name;
    private String code;
    private LocalDate protectionStartDate;
    private LocalDate protectionFinishDate;
    private Animal animal;
    private Report report;
}
