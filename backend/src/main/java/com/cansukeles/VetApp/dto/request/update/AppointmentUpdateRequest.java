package com.cansukeles.VetApp.dto.request.update;

import com.cansukeles.VetApp.dto.request.save.AppointmentSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentUpdateRequest extends AppointmentSaveRequest {
    private Long id;

}
