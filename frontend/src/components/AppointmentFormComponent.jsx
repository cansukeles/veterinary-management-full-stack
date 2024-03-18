import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
// mui
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import "../index.css";

const AppointmentFormComponent = ({
  isEdit,
  onSubmitHandler,
  selectedAppointment,
}) => {
  const animalsData = useSelector((state) => state.animals);
  const doctorsData = useSelector((state) => state.doctors);
  const availableDatesData = useSelector((state) => state.availableDates);

  const [animalValue, setAnimalValue] = useState("");
  const [doctorValue, setDoctorValue] = useState("");
  const [availableDateValue, setAvailableDateValue] = useState("");
  const [selectedTimeValue, setSelectedTimeValue] = useState("");
  const [appointmentDateValue, setAppointmentDateValue] = useState(
    dayjs(new Date())
  );

  useEffect(() => {
    if (selectedAppointment) {
      setAnimalValue(selectedAppointment.animal.id);
      setDoctorValue(selectedAppointment.doctor.id);
    }
  }, [selectedAppointment]);

  const handleAnimalFormChange = (event) => {
    setAnimalValue(event.target.value);
  };

  const handleDoctorFormChange = (event) => {
    setDoctorValue(event.target.value);
  };

  const handleAvailableDateFormChange = (event) => {
    setAvailableDateValue(event.target.value);
  };

  const handleAvailableDateTimeChange = (dateValue) => {
    const selectedTime = new Date(dateValue);

    const originalDate = new Date(availableDateValue);
    const convertedDate = `${originalDate
      .toISOString()
      .slice(0, 10)}T${selectedTime.toString().slice(16, 21)}:00`;

    setSelectedTimeValue(dateValue);
    setAppointmentDateValue(convertedDate);
  };

  const handleSubmit = () => {
    let requestBody = {
      appointmentDate: appointmentDateValue,
      doctor: {
        id: doctorValue,
      },
      animal: {
        id: animalValue,
      },
    };
    if (isEdit) {
      requestBody = {
        ...requestBody,
        id: selectedAppointment.id,
      };
    }

    onSubmitHandler(requestBody);
    setAnimalValue("");
    setDoctorValue("");
    setAvailableDateValue("");
    setAppointmentDateValue("");
  };

  return (
    <div className="form-div">
      <h2>{`${isEdit ? "Edit" : "Create"} Appointment`}</h2>
      <FormControl fullWidth>
        <InputLabel>Animal</InputLabel>
        <Select
          value={animalValue}
          label="Animal"
          onChange={handleAnimalFormChange}
        >
          {animalsData.items.map((animal, index) => (
            <MenuItem key={index} value={animal.id}>
              {animal.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Doctor</InputLabel>
        <Select
          value={doctorValue}
          label="Doctor"
          onChange={handleDoctorFormChange}
        >
          {doctorsData.items.map((doctor, index) => (
            <MenuItem key={index} value={doctor.id}>
              {doctor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <div className="date-picker-div">
          <div style={{ flex: 2 }}>
            <InputLabel>Available Date</InputLabel>
            <Select
              sx={{ width: "100%" }}
              disabled={doctorValue === ""}
              value={availableDateValue}
              label="Available Date"
              onChange={handleAvailableDateFormChange}
            >
              {availableDatesData.items
                .filter((item) => item.doctor.id === doctorValue)
                .map((availableDate, index) => (
                  <MenuItem key={index} value={availableDate.availableDate}>
                    {availableDate.availableDate}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div style={{ flex: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Time"
                sx={{ width: "100%" }}
                value={selectedTimeValue}
                onChange={(e) => handleAvailableDateTimeChange(e)}
              />
            </LocalizationProvider>
          </div>
        </div>
      </FormControl>

      <Button
        className="form-create-button"
        variant="contained"
        onClick={handleSubmit}
      >
        {`${isEdit ? "Update" : "Create"}`}
      </Button>
    </div>
  );
};

export default AppointmentFormComponent;
