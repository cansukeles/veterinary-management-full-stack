package com.cansukeles.VetApp.dto.response;

import com.cansukeles.VetApp.dto.AppointmentDto;
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
public class ReportResponse {
    private Long id;
    private String title;
    private String diagnosis;
    private Double price;
    private AppointmentDto appointmentDto;
    List<Vaccine> vaccineList;
}
