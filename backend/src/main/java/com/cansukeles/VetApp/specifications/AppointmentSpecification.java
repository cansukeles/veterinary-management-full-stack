package com.cansukeles.VetApp.specifications;

import com.cansukeles.VetApp.entities.Appointment;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class AppointmentSpecification {

    private AppointmentSpecification() {
    }

    public static Specification<Appointment> doctorAndIsBetweenDates(LocalDate startDate, LocalDate endDate, String doctorName) {
        return (root, query, builder) -> {
            Path<Appointment> doctor = root.get("doctor");
            Predicate doctorPredicate = builder.equal(doctor.get("name"), doctorName);
            Predicate isBetweenDatesPredicate = builder.between(root.get("appointmentDate"), startDate, endDate);

            return builder.and(doctorPredicate, isBetweenDatesPredicate);
        };
    }

    public static Specification<Appointment> animalAndIsBetweenDates(LocalDate startDate, LocalDate endDate, String animalName) {
        return (root, query, builder) -> {
            Path<Appointment> animal = root.get("animal");
            Predicate animalPredicate = builder.equal(animal.get("name"), animalName);
            Predicate isBetweenDatesPredicate = builder.between(root.get("appointmentDate"), startDate, endDate);

            return builder.and(animalPredicate, isBetweenDatesPredicate);
        };
    }

}
