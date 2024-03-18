package com.cansukeles.VetApp.api;

import com.cansukeles.VetApp.dto.request.save.AnimalSaveRequest;
import com.cansukeles.VetApp.dto.request.update.AnimalUpdateRequest;
import com.cansukeles.VetApp.dto.response.AnimalResponse;
import com.cansukeles.VetApp.service.AnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/animals")
@CrossOrigin()
public class AnimalController {


    private final AnimalService animalService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<AnimalResponse> getAnimals(@RequestParam(required = false) String nameLike) {
        return animalService.findAll(nameLike);
    }

    @GetMapping("/vaccine-dates")
    @ResponseStatus(HttpStatus.OK)
    public List<AnimalResponse> getAnimalsByVaccineDates(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {
        return animalService.findAllByVaccineDates(startDate, endDate);
    }

    @GetMapping("/customer-name")
    @ResponseStatus(HttpStatus.OK)
    public List<AnimalResponse> getAnimalsByCustomerName(@RequestParam(required = false) String customerNameLike) {
        return animalService.findAllAnimalsByCustomerName(customerNameLike);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AnimalResponse getAnimalById(@PathVariable Long id) {
        return animalService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AnimalResponse create(@RequestBody AnimalSaveRequest animalRequest) {
        return animalService.create(animalRequest);
    }

    @PutMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public AnimalResponse update(@RequestBody AnimalUpdateRequest animalUpdateRequest) {
        return animalService.update(animalUpdateRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        animalService.delete(id);
    }
}
