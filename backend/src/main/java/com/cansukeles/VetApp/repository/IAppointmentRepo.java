package com.cansukeles.VetApp.repository;

import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Appointment;
import com.cansukeles.VetApp.entities.AvailableDate;
import com.cansukeles.VetApp.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface IAppointmentRepo extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {
    Optional<Appointment> findById(Long id);

    Optional<Appointment> findByAppointmentDate(LocalDateTime appointmentDate);

    Optional<Appointment> findByAppointmentDateAndDoctor(LocalDateTime appointmentDate, Doctor doctor);

}
