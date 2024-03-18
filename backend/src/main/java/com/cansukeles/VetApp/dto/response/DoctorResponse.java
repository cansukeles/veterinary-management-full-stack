package com.cansukeles.VetApp.dto.response;

import com.cansukeles.VetApp.entities.Appointment;
import com.cansukeles.VetApp.entities.AvailableDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorResponse {

    private Long id;
    private String name;
    private String phone;
    private String mail;
    private String address;
    private String city;
    private List<AvailableDate> availableDateList;
    private List<Appointment> appointmentList;
}
