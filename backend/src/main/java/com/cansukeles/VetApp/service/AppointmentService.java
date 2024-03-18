package com.cansukeles.VetApp.service;

import com.cansukeles.VetApp.dto.request.save.AppointmentSaveRequest;
import com.cansukeles.VetApp.dto.request.update.AppointmentUpdateRequest;
import com.cansukeles.VetApp.dto.response.AnimalResponse;
import com.cansukeles.VetApp.dto.response.AppointmentResponse;
import com.cansukeles.VetApp.dto.response.AvailableDateResponse;
import com.cansukeles.VetApp.entities.Animal;
import com.cansukeles.VetApp.entities.Appointment;
import com.cansukeles.VetApp.entities.AvailableDate;
import com.cansukeles.VetApp.entities.Doctor;
import com.cansukeles.VetApp.mapper.AppointmentResponseMapper;
import com.cansukeles.VetApp.modelMapper.ModelMapperService;
import com.cansukeles.VetApp.repository.IAnimalRepo;
import com.cansukeles.VetApp.repository.IAppointmentRepo;
import com.cansukeles.VetApp.repository.IAvailableDateRepo;
import com.cansukeles.VetApp.repository.IDoctorRepo;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.cansukeles.VetApp.specifications.AppointmentSpecification.animalAndIsBetweenDates;
import static com.cansukeles.VetApp.specifications.AppointmentSpecification.doctorAndIsBetweenDates;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final IAppointmentRepo appointmentRepo;
    private final ModelMapperService modelMapperService;
    private final AppointmentResponseMapper appointmentResponseMapper;
    private final IAvailableDateRepo availableDateRepo;
    private final IDoctorRepo doctorRepo;
    private final IAnimalRepo animalRepo;

    public List<AppointmentResponse> findAll() {
        return appointmentRepo.findAll().stream().map(appointmentResponseMapper::apply).collect(Collectors.toList());
    }

    // Değerlendirme formu 24
    public List<AppointmentResponse> findAllByDoctorAndDate(LocalDate startDate, LocalDate endDate, String doctorName) {
        Specification<Appointment> filters = Specification.where(
                (StringUtils.isBlank(startDate.toString()) &&
                        StringUtils.isBlank(endDate.toString()) &&
                        StringUtils.isBlank(doctorName)) ?
                        null : doctorAndIsBetweenDates(startDate, endDate, doctorName));

        return appointmentRepo.findAll(filters)
                .stream()
                .map(appointmentResponseMapper::apply)
                .collect(Collectors.toList());
    }

    // Değerlendirme formu 23
    public List<AppointmentResponse> findAllByAnimalAndDate(LocalDate startDate, LocalDate endDate, String animalName) {
        Specification<Appointment> filters = Specification.where(
                (StringUtils.isBlank(startDate.toString()) &&
                        StringUtils.isBlank(endDate.toString()) &&
                        StringUtils.isBlank(animalName)) ?
                        null : animalAndIsBetweenDates(startDate, endDate, animalName));

        return appointmentRepo.findAll(filters)
                .stream()
                .map(appointmentResponseMapper::apply)
                .collect(Collectors.toList());
    }

    // Değerlendirme formu 25
    public AppointmentResponse getById(Long id) {
        Optional<Appointment> optionalAppointment = appointmentRepo.findById(id);
        if (optionalAppointment.isPresent()) {
            return modelMapperService.forResponse().map(optionalAppointment.get(), AppointmentResponse.class);
        } else {
            throw new RuntimeException("Appointment not found.");
        }
    }

    // Değerlendirme formu 14
    // Değerlendirme formu 22
    // Değerlendirme formu 25
    public AppointmentResponse create(AppointmentSaveRequest appointmentSaveRequest) {
        // convert LocalDateTime to LocalDate
        LocalDateTime appointmentDate = appointmentSaveRequest.getAppointmentDate();
        LocalDate dayOfAppointmentDate = appointmentDate.toLocalDate();
        Doctor requestDoctor = appointmentSaveRequest.getDoctor();

        // check if the given doctor exists
        Long doctorId = requestDoctor.getId();
        Optional<Doctor> optionalDoctor = doctorRepo.findById(doctorId);
        if (optionalDoctor.isEmpty()) {
            throw new RuntimeException("Doctor does not exist.");
        }

        // check if the given animal exists
        Optional<Animal> optionalAnimal = animalRepo.findById(appointmentSaveRequest.getAnimal().getId());
        if (optionalAnimal.isEmpty()) {
            throw new RuntimeException("Animal does not exist.");
        }

        // check if doctor has AvailableDate for the given date
        Optional<AvailableDate> optionalAvailableDate = availableDateRepo.findByAvailableDateAndDoctor(dayOfAppointmentDate, requestDoctor);
        if (optionalAvailableDate.isEmpty()) {
            throw new RuntimeException("Available date do not exists for the doctor.");
        }

        // check if the doctor already has an appointment for the given date & time
        Optional<Appointment> optionalAppointment = appointmentRepo.findByAppointmentDateAndDoctor(appointmentDate, requestDoctor);
        if (optionalAppointment.isPresent()) {
            throw new RuntimeException("Doctor already has an appointment for the given date and time.");
        }

        // create the appointment
        Appointment appointment = appointmentRepo.save(modelMapperService.
                forRequest().map(appointmentSaveRequest, Appointment.class));

        Doctor doctor = optionalDoctor.get();
        appointment.setDoctor(doctor);

        Animal animal = optionalAnimal.get();
        appointment.setAnimal(animal);

        return modelMapperService.forResponse().map(appointment, AppointmentResponse.class);
    }

    public AppointmentResponse update(AppointmentUpdateRequest appointmentUpdateRequest) {
        this.getById(appointmentUpdateRequest.getId());

        return modelMapperService.forResponse().map(appointmentRepo.save(modelMapperService.forRequest().map(
                appointmentUpdateRequest, Appointment.class)), AppointmentResponse.class);
    }

    // Değerlendirme formu 25
    public void delete(Long id) {
        Optional<Appointment> optionalAppointment = appointmentRepo.findById(id);
        if (!optionalAppointment.isPresent()) {
            throw new RuntimeException("Appointment doesn't exist");
        }
        Appointment appointment = optionalAppointment.get();
        this.appointmentRepo.delete(appointment);
    }
}
