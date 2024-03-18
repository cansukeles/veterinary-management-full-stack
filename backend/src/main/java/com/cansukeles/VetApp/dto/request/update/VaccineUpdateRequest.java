package com.cansukeles.VetApp.dto.request.update;

import com.cansukeles.VetApp.dto.request.save.VaccineSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaccineUpdateRequest extends VaccineSaveRequest {
    private Long id;
}
