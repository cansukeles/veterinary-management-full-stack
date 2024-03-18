package com.cansukeles.VetApp.api;

import com.cansukeles.VetApp.dto.request.save.CustomerSaveRequest;
import com.cansukeles.VetApp.dto.request.update.CustomerUpdateRequest;
import com.cansukeles.VetApp.dto.response.CustomerResponse;
import com.cansukeles.VetApp.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/customers")
@CrossOrigin()
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<CustomerResponse> getCustomers(@RequestParam(required = false) String nameLike) {
        return customerService.findAll(nameLike);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerResponse getCustomerById(@PathVariable Long id) {
        return customerService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerResponse create(@RequestBody CustomerSaveRequest customerSaveRequest) {
        return customerService.create(customerSaveRequest);
    }
    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerResponse update(@RequestBody CustomerUpdateRequest customerUpdateRequest) {
        return customerService.update(customerUpdateRequest);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        customerService.delete(id);
    }
}
