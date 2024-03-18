package com.cansukeles.VetApp.repository;

import com.cansukeles.VetApp.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IDoctorRepo extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByName(String name);
}
