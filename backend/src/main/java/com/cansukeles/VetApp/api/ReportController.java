package com.cansukeles.VetApp.api;

import com.cansukeles.VetApp.dto.request.save.DoctorSaveRequest;
import com.cansukeles.VetApp.dto.request.save.ReportSaveRequest;
import com.cansukeles.VetApp.dto.request.update.DoctorUpdateRequest;
import com.cansukeles.VetApp.dto.request.update.ReportUpdateRequest;
import com.cansukeles.VetApp.dto.response.DoctorResponse;
import com.cansukeles.VetApp.dto.response.ReportResponse;
import com.cansukeles.VetApp.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reports")
@CrossOrigin()
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ReportResponse> getReports() {
        return reportService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ReportResponse getReportById(@PathVariable Long id) {
        return reportService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReportResponse save(@RequestBody ReportSaveRequest reportSaveRequest) {
        return reportService.create(reportSaveRequest);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReportResponse update(@RequestBody ReportUpdateRequest reportUpdateRequest) {
        return reportService.update(reportUpdateRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        reportService.delete(id);
    }
}
