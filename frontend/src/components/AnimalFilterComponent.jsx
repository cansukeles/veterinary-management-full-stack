import { useState } from "react";
// mui
import { Button, TextField } from "@mui/material";

import "../index.css";

const AnimalFilterComponent = ({
  onNameSubmitHandler,
  onCustomerNameSubmitHandler,
  onResetHandler,
}) => {
  const [nameValue, setNameValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleCustomerChange = (event) => {
    setCustomerValue(event.target.value);
  };

  const handleNameSubmit = () => {
    onNameSubmitHandler(nameValue);
    setNameValue("");
    setCustomerValue("");
  };

  const handleCustomerSubmit = () => {
    onCustomerNameSubmitHandler(customerValue);
    setNameValue("");
    setCustomerValue("");
  };

  return (
    <div className="filter-div">
      <TextField
        label="Animal Name"
        sx={{ width: "500px" }}
        value={nameValue}
        onChange={handleNameChange}
      />
      <TextField
        label="Customer Name"
        sx={{ width: "500px" }}
        value={customerValue}
        onChange={handleCustomerChange}
      />
      <Button
        style={{ width: "400px" }}
        className="form-create-button"
        variant="contained"
        onClick={handleNameSubmit}
        disabled={nameValue === ""}
      >
        Filter By Animal Name
      </Button>
      <Button
        style={{ width: "400px" }}
        className="filter-submit-button"
        variant="contained"
        onClick={handleCustomerSubmit}
        disabled={customerValue === ""}
      >
        Filter By Customer Name
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

export default AnimalFilterComponent;
