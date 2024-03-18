package com.cansukeles.VetApp.dto.request.save;

import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Appointment;
import com.cansukeles.VetApp.entities.Vaccine;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportSaveRequest {
    private String title;
    private String diagnosis;
    private Double price;
    private Appointment appointment;
    List<Vaccine> vaccineList;
}
