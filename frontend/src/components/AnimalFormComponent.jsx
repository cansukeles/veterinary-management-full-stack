import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// mui
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../index.css";

const AnimalFormComponent = ({ isEdit, onSubmitHandler, selectedAnimal }) => {
  const customersData = useSelector((state) => state.customers);

  const [nameValue, setNameValue] = useState("");
  const [speciesValue, setSpeciesValue] = useState("");
  const [breedValue, setBreedValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [colourValue, setColourValue] = useState("");
  const [dateOfBirthValue, setDateOfBirthValue] = useState(dayjs(new Date()));
  const [customerValue, setCustomerValue] = useState("");

  useEffect(() => {
    if (selectedAnimal) {
      setNameValue(selectedAnimal.name);
      setSpeciesValue(selectedAnimal.species);
      setBreedValue(selectedAnimal.breed);
      setGenderValue(selectedAnimal.gender);
      setColourValue(selectedAnimal.colour);
      setDateOfBirthValue(dayjs(selectedAnimal.dateOfBirth));
    }
  }, [selectedAnimal]);

  const handleNameFormChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleSpeciesFormChange = (event) => {
    setSpeciesValue(event.target.value);
  };
  const handleBreedFormChange = (event) => {
    setBreedValue(event.target.value);
  };
  const handleGenderFormChange = (event) => {
    setGenderValue(event.target.value);
  };
  const handleColourFormChange = (event) => {
    setColourValue(event.target.value);
  };
  const handleCustomerFormChange = (event) => {
    setCustomerValue(event.target.value);
  };

  const handleSubmit = () => {
    let requestBody = {
      name: nameValue,
      species: speciesValue,
      breed: breedValue,
      gender: genderValue,
      colour: colourValue,
      dateOfBirth: dateOfBirthValue,
      customer: {
        id: customerValue,
      },
    };
    if (isEdit) {
      requestBody = {
        ...requestBody,
        id: selectedAnimal.id,
      };
    }

    onSubmitHandler(requestBody);
    setNameValue("");
    setSpeciesValue("");
    setBreedValue("");
    setGenderValue("");
    setColourValue("");
    setDateOfBirthValue(dayjs(new Date()));
  };

  return (
    <div className="form-div">
      <h2>{`${isEdit ? "Edit" : "Create"} Animal`}</h2>
      <TextField
        fullWidth
        label="Name"
        onChange={handleNameFormChange}
        value={nameValue}
      />
      <TextField
        fullWidth
        label="Species"
        onChange={handleSpeciesFormChange}
        value={speciesValue}
      />
      <TextField
        fullWidth
        label="Breed"
        onChange={handleBreedFormChange}
        value={breedValue}
      />
      <TextField
        fullWidth
        label="Gender"
        onChange={handleGenderFormChange}
        value={genderValue}
      />
      <TextField
        fullWidth
        label="Colour"
        onChange={handleColourFormChange}
        value={colourValue}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          label="Date of Birth"
          value={dateOfBirthValue}
          onChange={(newValue) => setDateOfBirthValue(newValue)}
          disableFuture
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel>Customer</InputLabel>
        <Select
          value={customerValue}
          label="Customer"
          onChange={handleCustomerFormChange}
        >
          {customersData.items.map((customer, index) => (
            <MenuItem key={index} value={customer.id}>
              {customer.name}
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

export default AnimalFormComponent;
