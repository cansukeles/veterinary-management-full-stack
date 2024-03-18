package com.cansukeles.VetApp.service;

import com.cansukeles.VetApp.dto.request.save.CustomerSaveRequest;
import com.cansukeles.VetApp.dto.request.update.CustomerUpdateRequest;
import com.cansukeles.VetApp.dto.response.CustomerResponse;
import com.cansukeles.VetApp.entities.Customer;
import com.cansukeles.VetApp.mapper.CustomerResponseMapper;
import com.cansukeles.VetApp.modelMapper.ModelMapperService;
import com.cansukeles.VetApp.repository.ICustomerRepo;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.cansukeles.VetApp.specifications.CustomerSpecification.nameLike;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final ICustomerRepo customerRepo;
    private final ModelMapperService modelMapperService;
    private final CustomerResponseMapper customerResponseMapper;

    /*public List<CustomerResponse> findAll(String nameLike) {
        List<Customer> customers = customerRepo.findAll();
        return customers.stream().map(customerResponseMapper::apply).collect(Collectors.toList());
    }*/

    // Değerlendirme formu 17
    public List<CustomerResponse> findAll(String nameLikeFilter) {
        Specification<Customer> filters = Specification.where(StringUtils.isBlank(nameLikeFilter) ? null : nameLike(nameLikeFilter));

        return customerRepo.findAll(filters)
                .stream()
                .map(customerResponseMapper::apply)
                .collect(Collectors.toList());
    }

    // Değerlendirme formu 25
    public CustomerResponse getById(Long id) {
        Optional<Customer> optionalCustomer = customerRepo.findById(id);
        if (optionalCustomer.isPresent()) {
            return modelMapperService.forResponse().map(optionalCustomer.get(), CustomerResponse.class);
        } else {
            throw new RuntimeException("Customer not found with this id: " + id);
        }
    }

    //// Değerlendirme formu 10
    // Değerlendirme formu 25
    public CustomerResponse create(CustomerSaveRequest customerSaveRequest) {
        Optional<Customer> optionalCustomer = customerRepo.findByName(customerSaveRequest.getName());
        if (optionalCustomer.isPresent()) {
            throw new RuntimeException("Customer already exist with this name: " + customerSaveRequest.getName());
        }
        return modelMapperService.forResponse().map(customerRepo.save(modelMapperService.forRequest().map(customerSaveRequest, Customer.class)), CustomerResponse.class);
    }

    public CustomerResponse update(CustomerUpdateRequest customerUpdateRequest) {
        this.getById(customerUpdateRequest.getId());
        return modelMapperService.forResponse().map(customerRepo.save(modelMapperService.forRequest().map(customerUpdateRequest, Customer.class)), CustomerResponse.class);
    }

    // Değerlendirme formu 25
    public void delete(Long id) {
        Optional<Customer> optionalCustomer = customerRepo.findById(id);
        if (!optionalCustomer.isPresent()) {
            throw new RuntimeException("Customer doesn't exist");
        }
        Customer customer = optionalCustomer.get();
        this.customerRepo.delete(customer);
    }

}
