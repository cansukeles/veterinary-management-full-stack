package com.cansukeles.VetApp.repository;

import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Appointment;
import com.cansukeles.VetApp.entities.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IVaccineRepo extends JpaRepository<Vaccine, Long>, JpaSpecificationExecutor<Vaccine> {
    Optional<Vaccine> findByNameAndCodeAndAnimal(String name, String code, Animal animal);

    List<Vaccine> findByAnimal(Animal animal);
}
