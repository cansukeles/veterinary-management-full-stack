package com.cansukeles.VetApp.dto.request.update;

import com.cansukeles.VetApp.dto.request.save.DoctorSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorUpdateRequest extends DoctorSaveRequest {
    private Long id;
}
