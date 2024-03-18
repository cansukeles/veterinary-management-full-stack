package com.cansukeles.VetApp.dto.response;

import com.cansukeles.VetApp.dto.AnimalDto;
import com.cansukeles.VetApp.dto.ReportDto;
import com.cansukeles.VetApp.entities.Report;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaccineResponse {
    private Long id;
    private String name;
    private String code;
    private LocalDate protectionStartDate;
    private LocalDate protectionFinishDate;
    private AnimalDto animalDto;
    private Long reportId;
}
