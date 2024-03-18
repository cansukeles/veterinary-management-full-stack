package com.cansukeles.VetApp.api;

import com.cansukeles.VetApp.dto.request.save.VaccineSaveRequest;
import com.cansukeles.VetApp.dto.request.update.VaccineUpdateRequest;
import com.cansukeles.VetApp.dto.response.AppointmentResponse;
import com.cansukeles.VetApp.dto.response.VaccineResponse;
import com.cansukeles.VetApp.service.VaccineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vaccines")
@CrossOrigin()
public class VaccineController {

    private final VaccineService vaccineService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<VaccineResponse> getVaccines() {
        return vaccineService.findAll();
    }

    @GetMapping("/filter-by-date")
    @ResponseStatus(HttpStatus.OK)
    public List<VaccineResponse> getAppointmentsByDoctorAndDate(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {
        return vaccineService.filterAllByDate(startDate, endDate);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public VaccineResponse getVaccineById(@PathVariable Long id) {
        return vaccineService.getById(id);
    }

    @GetMapping("/get-by-animal/{id}")
    public List<VaccineResponse> getVaccinesByAnimalId(@PathVariable Long id) {
        return vaccineService.getByAnimalId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VaccineResponse create(@RequestBody VaccineSaveRequest vaccineSaveRequest) {
        return vaccineService.create(vaccineSaveRequest);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VaccineResponse update(@RequestBody VaccineUpdateRequest vaccineUpdateRequest) {
        return vaccineService.update(vaccineUpdateRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        vaccineService.delete(id);
    }
}
