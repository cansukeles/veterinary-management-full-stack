import { useState } from "react";
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

const VaccineFilterComponent = ({
  onAnimalSubmitHandler,
  onDatesSubmitHandler,
  onResetHandler,
}) => {
  const animalsData = useSelector((state) => state.animals);

  const [animalValue, setAnimalValue] = useState(-1);
  const [fromDateValue, setFromDateValue] = useState(dayjs(new Date()));
  const [toDateValue, setToDateValue] = useState(dayjs(new Date()));

  const handleAnimalFormChange = (event) => {
    setAnimalValue(event.target.value);
  };

  const handleAnimalSubmit = () => {
    onAnimalSubmitHandler(animalValue);
    // setAnimalValue(-1);
  };

  const handleDatesSubmit = () => {
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

    const requestBody = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    onDatesSubmitHandler(requestBody);
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
        >
          <MenuItem key={-1} value={-1}>
            None
          </MenuItem>
          {animalsData.items.map((animal, index) => (
            <MenuItem key={index} value={animal.id}>
              {animal.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className="filter-submit-button"
        variant="contained"
        onClick={handleAnimalSubmit}
        disabled={animalValue <= -1}
      >
        Filter By Animal
      </Button>
      <Button
        className="filter-submit-button"
        variant="contained"
        onClick={handleDatesSubmit}
      >
        Filter By Dates
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

export default VaccineFilterComponent;
