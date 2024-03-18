package com.cansukeles.VetApp.dto.request.update;

import com.cansukeles.VetApp.dto.request.save.AvailableDateSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvailableDateUpdateRequest extends AvailableDateSaveRequest {
    private Long id;
}
