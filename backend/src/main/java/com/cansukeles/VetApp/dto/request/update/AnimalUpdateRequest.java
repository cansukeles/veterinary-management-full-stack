package com.cansukeles.VetApp.dto.request.update;

import com.cansukeles.VetApp.dto.request.save.AnimalSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalUpdateRequest extends AnimalSaveRequest {
    private Long id;
}
