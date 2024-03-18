package com.cansukeles.VetApp.service;

import com.cansukeles.VetApp.dto.request.save.DoctorSaveRequest;
import com.cansukeles.VetApp.dto.request.update.DoctorUpdateRequest;
import com.cansukeles.VetApp.dto.response.DoctorResponse;
import com.cansukeles.VetApp.entities.Doctor;
import com.cansukeles.VetApp.mapper.DoctorResponseMapper;
import com.cansukeles.VetApp.modelMapper.ModelMapperService;
import com.cansukeles.VetApp.repository.IDoctorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final IDoctorRepo doctorRepo;
    private final ModelMapperService modelMapperService;
    private final DoctorResponseMapper doctorResponseMapper;

    public List<DoctorResponse> findAll() {
        return doctorRepo.findAll().stream().map(doctorResponseMapper::apply).collect(Collectors.toList());
    }

    // Değerlendirme formu 25
    public DoctorResponse getById(Long id) {
        Optional<Doctor> optionalDoctor = doctorRepo.findById(id);
        if (optionalDoctor.isPresent()) {
            return modelMapperService.forResponse().map(optionalDoctor.get(), DoctorResponse.class);
        } else {
            throw new RuntimeException("Doctor not found with this id: " + id);
        }
    }

    // Değerlendirme formu 12
    // Değerlendirme formu 25
    public DoctorResponse create(DoctorSaveRequest doctorSaveRequest) {
        Optional<Doctor> optionalDoctor = doctorRepo.findByName(doctorSaveRequest.getName());
        if (optionalDoctor.isPresent()) {
            throw new RuntimeException("Doctor already exist with this name: " + doctorSaveRequest.getName());
        }
        Doctor doctor = doctorRepo.save(modelMapperService.forRequest().map(doctorSaveRequest, Doctor.class));
        return modelMapperService.forResponse().map(doctor, DoctorResponse.class);
    }

    public DoctorResponse update(DoctorUpdateRequest doctorUpdateRequest) {
        this.getById(doctorUpdateRequest.getId());
        return modelMapperService.forResponse().map(doctorRepo.save(modelMapperService.forRequest().map(doctorUpdateRequest, Doctor.class)), DoctorResponse.class);
    }

    // Değerlendirme formu 25
    public void delete(Long id) {
        Optional<Doctor> optionalDoctor = doctorRepo.findById(id);
        if(!optionalDoctor.isPresent()) {
            throw new RuntimeException("Doctor doesn't exist");
        }
        Doctor doctor = optionalDoctor.get();
        this.doctorRepo.delete(doctor);
    }

}
