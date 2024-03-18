package com.cansukeles.VetApp.specifications;

import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Vaccine;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class AnimalSpecification {

    private AnimalSpecification() {
    }

    // First request parameter filter: Get customers with name like a specific string
    public static Specification<Animal> nameLike(String nameLike) {
        return (root, query, builder) -> builder.like(builder.lower(
                root.get("name")
        ), "%" + nameLike.toLowerCase() + "%");
    }

    public static Specification<Animal> customerNameLike(String customerNameLike) {
        return (root, query, builder) -> {
            Path<Animal> customer = root.get("customer");
            return builder.like(builder.lower(customer.get("name")), "%" + customerNameLike.toLowerCase() + "%");
        };
    }

    public static Specification<Animal> vaccineDateLike(LocalDate startDate, LocalDate endDate) {
        return (root, query, builder) -> {
            Join<Animal, Vaccine> vaccineAnimals = root.join("vaccineList");
            Predicate startDatePredicate = builder.greaterThanOrEqualTo(vaccineAnimals.get("protectionStartDate"), startDate);
            Predicate endDatePredicate = builder.lessThanOrEqualTo(vaccineAnimals.get("protectionFinishDate"), endDate);
            return builder.and(startDatePredicate, endDatePredicate);
        };
    }
}
