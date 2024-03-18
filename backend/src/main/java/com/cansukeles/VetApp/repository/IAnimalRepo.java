package com.cansukeles.VetApp.repository;

import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAnimalRepo extends JpaRepository<Animal, Long>, JpaSpecificationExecutor<Animal> {
    Optional<Animal> findByName(String name);
}

