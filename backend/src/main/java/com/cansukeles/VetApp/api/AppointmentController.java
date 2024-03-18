package com.cansukeles.VetApp.api;

import com.cansukeles.VetApp.dto.request.save.AppointmentSaveRequest;
import com.cansukeles.VetApp.dto.request.update.AppointmentUpdateRequest;
import com.cansukeles.VetApp.dto.response.AnimalResponse;
import com.cansukeles.VetApp.dto.response.AppointmentResponse;
import com.cansukeles.VetApp.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/appointments")
@CrossOrigin()
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<AppointmentResponse> getAppointments() {
        return appointmentService.findAll();
    }

    @GetMapping("/available-date-and-doctor")
    @ResponseStatus(HttpStatus.OK)
    public List<AppointmentResponse> getAppointmentsByDoctorAndDate(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String doctorName)
    {
        return appointmentService.findAllByDoctorAndDate(startDate, endDate, doctorName);
    }

    @GetMapping("/available-date-and-animal")
    @ResponseStatus(HttpStatus.OK)
    public List<AppointmentResponse> getAppointmentsByAnimalAndDate(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String animalName)
    {
        return appointmentService.findAllByAnimalAndDate(startDate, endDate, animalName);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppointmentResponse getById(@PathVariable Long id) {
        return appointmentService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentResponse create(@RequestBody AppointmentSaveRequest appointmentSaveRequest) {
        return appointmentService.create(appointmentSaveRequest);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentResponse update(@RequestBody AppointmentUpdateRequest appointmentUpdateRequest) {
        return appointmentService.update(appointmentUpdateRequest);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        appointmentService.delete(id);
    }
}
