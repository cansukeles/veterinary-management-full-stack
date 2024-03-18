package com.cansukeles.VetApp.mapper;

import com.cansukeles.VetApp.dto.response.CustomerResponse;
import org.springframework.stereotype.Service;
import com.cansukeles.VetApp.entities.Customer;

import java.util.function.Function;

@Service
public class CustomerResponseMapper implements Function<Customer, CustomerResponse> {
    @Override
    public CustomerResponse apply(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getPhone(),
                customer.getMail(),
                customer.getAddress(),
                customer.getCity(),
                customer.getAnimalList()
        );
    }
}
