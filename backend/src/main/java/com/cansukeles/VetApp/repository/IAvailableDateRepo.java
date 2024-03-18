package com.cansukeles.VetApp.repository;

import com.cansukeles.VetApp.entities.AvailableDate;
import com.cansukeles.VetApp.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface IAvailableDateRepo extends JpaRepository<AvailableDate, Long> {
    Optional<AvailableDate> findById(Long id);
    Optional<AvailableDate> findByAvailableDate(LocalDate availableDate);

    Optional<AvailableDate> findByAvailableDateAndDoctor(LocalDate dayOfAppointmentDate, Doctor doctor);
}
