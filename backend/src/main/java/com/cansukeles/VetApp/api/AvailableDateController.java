package com.cansukeles.VetApp.api;

import com.cansukeles.VetApp.dto.request.save.AvailableDateSaveRequest;
import com.cansukeles.VetApp.dto.request.update.AvailableDateUpdateRequest;
import com.cansukeles.VetApp.dto.response.AvailableDateResponse;
import com.cansukeles.VetApp.service.AvailableDateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/available-dates")
@CrossOrigin()
public class AvailableDateController {

    private final AvailableDateService availableDateService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<AvailableDateResponse> getAvailableDates() {
        return availableDateService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AvailableDateResponse getById(@PathVariable Long id) {
        return availableDateService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AvailableDateResponse create(@RequestBody AvailableDateSaveRequest availableDateSaveRequest) {
        return availableDateService.create(availableDateSaveRequest);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AvailableDateResponse update(@RequestBody AvailableDateUpdateRequest availableDateUpdateRequest) {
        return availableDateService.update(availableDateUpdateRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        availableDateService.delete(id);
    }


}
