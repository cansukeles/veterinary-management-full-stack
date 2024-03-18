package com.cansukeles.VetApp.api;

import com.cansukeles.VetApp.dto.request.save.DoctorSaveRequest;
import com.cansukeles.VetApp.dto.request.update.DoctorUpdateRequest;
import com.cansukeles.VetApp.dto.response.DoctorResponse;
import com.cansukeles.VetApp.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/doctors")
@CrossOrigin()
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<DoctorResponse> getDoctors() {
        return doctorService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public DoctorResponse getDoctorById(@PathVariable Long id) {
        return doctorService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoctorResponse save(@RequestBody DoctorSaveRequest doctorSaveRequest) {
        return doctorService.create(doctorSaveRequest);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoctorResponse update(@RequestBody DoctorUpdateRequest doctorUpdateRequest) {
        return doctorService.update(doctorUpdateRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        doctorService.delete(id);
    }
}
