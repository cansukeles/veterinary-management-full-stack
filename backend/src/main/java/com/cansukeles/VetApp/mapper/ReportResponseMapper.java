package com.cansukeles.VetApp.mapper;

import com.cansukeles.VetApp.dto.AnimalDto;
import com.cansukeles.VetApp.dto.AppointmentDto;
import com.cansukeles.VetApp.dto.CustomerDto;
import com.cansukeles.VetApp.dto.DoctorDto;
import com.cansukeles.VetApp.dto.response.AppointmentResponse;
import com.cansukeles.VetApp.dto.response.ReportResponse;
import com.cansukeles.VetApp.entities.Report;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ReportResponseMapper implements Function<Report, ReportResponse> {
    @Override
    public ReportResponse apply(Report report) {
        return new ReportResponse(
                report.getId(),
                report.getTitle(),
                report.getDiagnosis(),
                report.getPrice(),
                new AppointmentDto(
                        report.getAppointment().getId(),
                        report.getAppointment().getAppointmentDate(),
                        new DoctorDto(
                                report.getAppointment().getDoctor().getId(),
                                report.getAppointment().getDoctor().getName(),
                                report.getAppointment().getDoctor().getPhone(),
                                report.getAppointment().getDoctor().getMail(),
                                report.getAppointment().getDoctor().getAddress(),
                                report.getAppointment().getDoctor().getCity()
                        ),
                        new AnimalDto(
                                report.getAppointment().getAnimal().getId(),
                                report.getAppointment().getAnimal().getName(),
                                report.getAppointment().getAnimal().getSpecies(),
                                report.getAppointment().getAnimal().getBreed(),
                                report.getAppointment().getAnimal().getGender(),
                                report.getAppointment().getAnimal().getColour(),
                                report.getAppointment().getAnimal().getDateOfBirth(),
                                new CustomerDto(
                                        report.getAppointment().getAnimal().getCustomer().getId(),
                                        report.getAppointment().getAnimal().getCustomer().getName(),
                                        report.getAppointment().getAnimal().getCustomer().getPhone(),
                                        report.getAppointment().getAnimal().getCustomer().getMail(),
                                        report.getAppointment().getAnimal().getCustomer().getAddress(),
                                        report.getAppointment().getAnimal().getCustomer().getCity()
                                )
                        )
                ),
                report.getVaccineList()
        );
    }
}
