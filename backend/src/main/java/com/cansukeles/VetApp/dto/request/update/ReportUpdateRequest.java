package com.cansukeles.VetApp.dto.request.update;

import com.cansukeles.VetApp.dto.request.save.ReportSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportUpdateRequest extends ReportSaveRequest {
    private Long id;

}
