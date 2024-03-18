package com.cansukeles.VetApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "diagnosis")
    private String diagnosis;

    @Column(name = "price")
    private Double price;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "appointment_id", referencedColumnName = "id")
    @JsonIgnore
    private Appointment appointment;

    @OneToMany(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id") // This specifies the column name in the Vaccine table that references the Report table
    private List<Vaccine> vaccineList;


    // @OneToMany(mappedBy = "report", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    // @OneToMany(fetch = FetchType.LAZY, mappedBy = "report", cascade = CascadeType.ALL)
    // private List<Vaccine> vaccineList;




}
