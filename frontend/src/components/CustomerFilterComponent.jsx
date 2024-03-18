import { useState } from "react";
// mui
import { Button, TextField } from "@mui/material";

import "../index.css";

const CustomerFilterComponent = ({ onNameSubmitHandler, onResetHandler }) => {
  const [nameValue, setNameValue] = useState("");

  const handleCustomerNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleNameSubmit = () => {
    onNameSubmitHandler(nameValue);
    setNameValue("");
  };

  return (
    <div className="filter-div">
      <TextField
        label="Customer Name"
        sx={{ width: "400px" }}
        value={nameValue}
        onChange={handleCustomerNameChange}
      />
      <Button
        style={{ width: "100px" }}
        className="form-create-button"
        variant="contained"
        onClick={handleNameSubmit}
        disabled={nameValue === ""}
      >
        Filter
      </Button>
      <Button
        className="form-create-button"
        style={{ width: "100px" }}
        variant="contained"
        onClick={onResetHandler}
      >
        Reset
      </Button>
    </div>
  );
};

export default CustomerFilterComponent;
