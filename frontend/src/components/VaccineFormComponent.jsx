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
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../index.css";

const VaccineFormComponent = ({ isEdit, onSubmitHandler, selectedVaccine }) => {
  const animalsData = useSelector((state) => state.animals);

  const [nameValue, setNameValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [animalValue, setAnimalValue] = useState("");
  const [protectionStartDateValue, setProtectionStartDateValue] = useState(
    dayjs(new Date())
  );
  const [protectionEndDateValue, setProtectionEndDateValue] = useState(
    dayjs(new Date())
  );

  useEffect(() => {
    if (selectedVaccine) {
      setNameValue(selectedVaccine.name);
      setCodeValue(selectedVaccine.code);
      setProtectionStartDateValue(dayjs(selectedVaccine.protectionStartDate));
      setProtectionEndDateValue(dayjs(selectedVaccine.protectionFinishDate));
      setAnimalValue(selectedVaccine.animalDto.id);
    }
  }, [selectedVaccine]);

  const handleAnimalFormChange = (event) => {
    setAnimalValue(event.target.value);
  };
  const handleNameFormChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleCodeFormChange = (event) => {
    setCodeValue(event.target.value);
  };

  const handleSubmit = () => {
    // Format the start date as "YYYY-MM-DD"
    const selectedStartDate = new Date(protectionStartDateValue);
    const startYear = selectedStartDate.getFullYear();
    const startMonth = ("0" + (selectedStartDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
    const startDay = ("0" + selectedStartDate.getDate()).slice(-2);
    const formattedProtectionStartDate =
      startYear + "-" + startMonth + "-" + startDay;

    // Format the end date as "YYYY-MM-DD"
    const selectedEndDate = new Date(protectionEndDateValue);
    const endYear = selectedEndDate.getFullYear();
    const endMonth = ("0" + (selectedEndDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
    const endDay = ("0" + selectedEndDate.getDate()).slice(-2);
    const formattedProtectionEndDate = endYear + "-" + endMonth + "-" + endDay;

    let requestBody = {
      name: nameValue,
      code: codeValue,
      protectionStartDate: formattedProtectionStartDate,
      protectionFinishDate: formattedProtectionEndDate,
      animal: {
        id: animalValue,
      },
    };
    if (isEdit) {
      requestBody = {
        ...requestBody,
        id: selectedVaccine.id,
      };
    }

    onSubmitHandler(requestBody);
    setAnimalValue("");
    setNameValue("");
    setProtectionStartDateValue(dayjs(new Date()));
    setProtectionEndDateValue(dayjs(new Date()));
    setCodeValue("");
  };

  return (
    <div className="form-div">
      <h2>{`${isEdit ? "Edit" : "Create"} Vaccine`}</h2>
      <TextField
        fullWidth
        label="Name"
        onChange={handleNameFormChange}
        value={nameValue}
      />
      <TextField
        fullWidth
        label="Code"
        onChange={handleCodeFormChange}
        value={codeValue}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          label="Protection Start Date"
          value={protectionStartDateValue}
          onChange={(newValue) => setProtectionStartDateValue(newValue)}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          label="Protection End Date"
          value={protectionEndDateValue}
          onChange={(newValue) => setProtectionEndDateValue(newValue)}
        />
      </LocalizationProvider>

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

export default VaccineFormComponent;
