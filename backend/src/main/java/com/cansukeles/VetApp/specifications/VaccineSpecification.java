package com.cansukeles.VetApp.specifications;

import com.cansukeles.VetApp.entities.Vaccine;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class VaccineSpecification {

    private VaccineSpecification() {
    }

    public static Specification<Vaccine> isBetweenDates(LocalDate startDate, LocalDate endDate) {
        return (root, query, builder) -> {
            Predicate isAfterPredicate = builder.greaterThanOrEqualTo(root.get("protectionStartDate"), startDate);
            Predicate isBeforePredicate = builder.lessThanOrEqualTo(root.get("protectionFinishDate"), endDate);

            return builder.and(isAfterPredicate, isBeforePredicate);
        };
    }
}
