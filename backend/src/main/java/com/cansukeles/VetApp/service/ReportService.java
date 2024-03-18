package com.cansukeles.VetApp.service;

import com.cansukeles.VetApp.dto.request.save.ReportSaveRequest;
import com.cansukeles.VetApp.dto.request.update.ReportUpdateRequest;
import com.cansukeles.VetApp.dto.response.DoctorResponse;
import com.cansukeles.VetApp.dto.response.ReportResponse;
import com.cansukeles.VetApp.entities.Doctor;
import com.cansukeles.VetApp.entities.Report;
import com.cansukeles.VetApp.entities.Vaccine;
import com.cansukeles.VetApp.mapper.ReportResponseMapper;
import com.cansukeles.VetApp.modelMapper.ModelMapperService;
import com.cansukeles.VetApp.repository.IReportRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final IReportRepo reportRepo;
    private final ModelMapperService modelMapperService;
    private final ReportResponseMapper reportResponseMapper;

    public List<ReportResponse> findAll(){
        return reportRepo.findAll().stream().map(reportResponseMapper::apply).collect(Collectors.toList());
    }

    public ReportResponse getById(Long id){
        Optional<Report> optionalReport = reportRepo.findById(id);
        if (optionalReport.isPresent()) {
            return modelMapperService.forResponse().map(optionalReport.get(), ReportResponse.class);
        } else {
            throw new RuntimeException("Report not found with this id: " + id);
        }
    }

    public ReportResponse create(ReportSaveRequest reportSaveRequest){
        Optional<Report> optionalReport = reportRepo.findByTitle(reportSaveRequest.getTitle());
        if (optionalReport.isPresent()) {
            throw new RuntimeException("Report already exist with this name: " + reportSaveRequest.getTitle());
        }
        Report report = reportRepo.save(modelMapperService.forRequest().map(reportSaveRequest, Report.class));

        return modelMapperService.forResponse().map(report, ReportResponse.class);
    }

    public ReportResponse update(ReportUpdateRequest reportUpdateRequest){
        this.getById(reportUpdateRequest.getId());
        return modelMapperService.forResponse().map(reportRepo.save(modelMapperService.forRequest().map(reportUpdateRequest, Report.class)), ReportResponse.class);
    }

    public void delete(Long id){
        Optional<Report> optionalReport = reportRepo.findById(id);
        if(!optionalReport.isPresent()) {
            throw new RuntimeException("Report doesn't exist");
        }
        Report report = optionalReport.get();
        this.reportRepo.delete(report);
    }

}
