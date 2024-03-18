package com.cansukeles.VetApp.repository;


import com.cansukeles.VetApp.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IReportRepo extends JpaRepository<Report, Long>, JpaSpecificationExecutor<Report> {

    Optional<Report> findByTitle(String title);
}
