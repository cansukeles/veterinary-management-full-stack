import { useState, useEffect } from "react";
// mui
import { Button, TextField } from "@mui/material";

import "../index.css";

const DoctorFormComponent = ({ isEdit, onSubmitHandler, selectedDoctor }) => {
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [mailValue, setMailValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  useEffect(() => {
    if (selectedDoctor) {
      setNameValue(selectedDoctor.name);
      setPhoneValue(selectedDoctor.phone);
      setMailValue(selectedDoctor.mail);
      setAddressValue(selectedDoctor.address);
      setCityValue(selectedDoctor.city);
    }
  }, [selectedDoctor]);

  const handleNameFormChange = (event) => {
    setNameValue(event.target.value);
  };
  const handlePhoneFormChange = (event) => {
    setPhoneValue(event.target.value);
  };
  const handleMailFormChange = (event) => {
    setMailValue(event.target.value);
  };
  const handleAddressFormChange = (event) => {
    setAddressValue(event.target.value);
  };
  const handleCityFormChange = (event) => {
    setCityValue(event.target.value);
  };

  const handleSubmit = () => {
    let requestBody = {
      name: nameValue,
      phone: phoneValue,
      mail: mailValue,
      address: addressValue,
      city: cityValue,
    };
    if (isEdit) {
      requestBody = {
        ...requestBody,
        id: selectedDoctor.id,
      };
    }

    onSubmitHandler(requestBody);
    setNameValue("");
    setPhoneValue("");
    setMailValue("");
    setAddressValue("");
    setCityValue("");
  };

  return (
    <div className="form-div">
      <h2>{`${isEdit ? "Edit" : "Create"} Doctor`}</h2>
      <TextField
        fullWidth
        label="Name"
        onChange={handleNameFormChange}
        value={nameValue}
      />
      <TextField
        fullWidth
        label="Phone"
        onChange={handlePhoneFormChange}
        value={phoneValue}
      />
      <TextField
        fullWidth
        label="Email"
        onChange={handleMailFormChange}
        value={mailValue}
      />
      <TextField
        fullWidth
        label="Address"
        onChange={handleAddressFormChange}
        value={addressValue}
      />
      <TextField
        fullWidth
        label="City"
        onChange={handleCityFormChange}
        value={cityValue}
      />

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

export default DoctorFormComponent;
