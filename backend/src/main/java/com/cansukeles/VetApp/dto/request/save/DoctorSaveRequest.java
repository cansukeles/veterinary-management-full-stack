package com.cansukeles.VetApp.dto.request.save;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorSaveRequest {

    private String name;
    private String phone;
    private String mail;
    private String address;
    private String city;
}
