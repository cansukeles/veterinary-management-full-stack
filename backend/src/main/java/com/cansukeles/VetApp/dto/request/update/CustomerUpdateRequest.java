package com.cansukeles.VetApp.dto.request.update;

import com.cansukeles.VetApp.dto.request.save.CustomerSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerUpdateRequest extends CustomerSaveRequest {
    private Long id;
}
