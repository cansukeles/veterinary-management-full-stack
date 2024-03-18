package com.cansukeles.VetApp.specifications;


import org.springframework.data.jpa.domain.Specification;
import com.cansukeles.VetApp.entities.Customer;

public class CustomerSpecification {

    private CustomerSpecification() {
    }

    // First request parameter filter: Get customers with name like a specific string
    public static Specification<Customer> nameLike(String nameLike) {
        return (root, query, builder) -> builder.like(
                builder.lower(
                        root.get("name")
                ), "%" + nameLike.toLowerCase() + "%"
        );
    }
}