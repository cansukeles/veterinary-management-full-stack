import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// mui
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../index.css";

const AppointmentFilterComponent = ({
  onAnimalSubmitHandler,
  onDoctorSubmitHandler,
  onResetHandler,
}) => {
  const animalsData = useSelector((state) => state.animals);
  const doctorsData = useSelector((state) => state.doctors);

  const [doctorValue, setDoctorValue] = useState("None");
  const [animalValue, setAnimalValue] = useState("None");
  const [fromDateValue, setFromDateValue] = useState(dayjs(new Date()));
  const [toDateValue, setToDateValue] = useState(dayjs(new Date()));
  const [filterEnabled, setFilterEnabled] = useState(false);

  const handleAnimalFormChange = (event) => {
    setAnimalValue(event.target.value);
  };
  const handleDoctorFormChange = (event) => {
    setDoctorValue(event.target.value);
  };

  useEffect(() => {
    if (
      fromDateValue &&
      toDateValue &&
      (doctorValue !== "None" || animalValue !== "None")
    ) {
      setFilterEnabled(true);
    } else {
      setFilterEnabled(false);
    }
  }, [fromDateValue, toDateValue, doctorValue, animalValue]);

  const handleSubmit = () => {
    // Format the start date as "YYYY-MM-DD"
    const selectedStartDate = new Date(fromDateValue);
    const startYear = selectedStartDate.getFullYear();
    const startMonth = ("0" + (selectedStartDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
    const startDay = ("0" + selectedStartDate.getDate()).slice(-2);
    const formattedStartDate = startYear + "-" + startMonth + "-" + startDay;

    // Format the end date as "YYYY-MM-DD"
    const selectedEndDate = new Date(toDateValue);
    const endYear = selectedEndDate.getFullYear();
    const endMonth = ("0" + (selectedEndDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
    const endDay = ("0" + selectedEndDate.getDate()).slice(-2);
    const formattedEndDate = endYear + "-" + endMonth + "-" + endDay;

    let requestBody = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    if (animalValue !== "None") {
      requestBody = {
        ...requestBody,
        animal: animalValue,
      };
      onAnimalSubmitHandler(requestBody);
    } else if (doctorValue !== "None") {
      requestBody = {
        ...requestBody,
        doctor: doctorValue,
      };
      onDoctorSubmitHandler(requestBody);
    }

    setAnimalValue("None");
    setDoctorValue("None");
    setFromDateValue(dayjs(new Date()));
    setToDateValue(dayjs(new Date()));
  };

  return (
    <div className="filter-div">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          label="From"
          value={fromDateValue}
          onChange={(newValue) => setFromDateValue(newValue)}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          label="To"
          value={toDateValue}
          onChange={(newValue) => setToDateValue(newValue)}
        />
      </LocalizationProvider>

      <FormControl fullWidth>
        <InputLabel>Animal</InputLabel>
        <Select
          value={animalValue}
          label="Animal"
          onChange={handleAnimalFormChange}
          disabled={doctorValue !== "None"}
        >
          <MenuItem key={-1} value="None">
            None
          </MenuItem>
          {animalsData.items.map((animal, index) => (
            <MenuItem key={index} value={animal.name}>
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
          disabled={animalValue !== "None"}
        >
          <MenuItem key={-1} value="None">
            None
          </MenuItem>
          {doctorsData.items.map((doctor, index) => (
            <MenuItem key={index} value={doctor.name}>
              {doctor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        className="form-create-button"
        variant="contained"
        onClick={handleSubmit}
        disabled={!filterEnabled}
      >
        Filter
      </Button>
      <Button
        className="form-create-button"
        variant="contained"
        onClick={onResetHandler}
      >
        Reset
      </Button>
    </div>
  );
};

export default AppointmentFilterComponent;
