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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../index.css";

const AvailableDateFormComponent = ({
  isEdit,
  onSubmitHandler,
  selectedAvailableDate,
}) => {
  const doctorsData = useSelector((state) => state.doctors);

  const [doctorValue, setDoctorValue] = useState("");
  const [availableDateValue, setAvailableDateValue] = useState(
    dayjs(new Date())
  );

  useEffect(() => {
    if (selectedAvailableDate) {
      setAvailableDateValue(dayjs(selectedAvailableDate.availableDate));
      setDoctorValue(selectedAvailableDate.doctor.id);
    }
  }, [selectedAvailableDate]);

  const handleDoctorFormChange = (event) => {
    setDoctorValue(event.target.value);
  };

  const handleSubmit = () => {
    // Format the start date as "YYYY-MM-DD"
    const selectedStartDate = new Date(availableDateValue);
    const startYear = selectedStartDate.getFullYear();
    const startMonth = ("0" + (selectedStartDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
    const startDay = ("0" + selectedStartDate.getDate()).slice(-2);
    const formattedAvailableDateValue =
      startYear + "-" + startMonth + "-" + startDay;

    let requestBody = {
      availableDate: formattedAvailableDateValue,
      doctor: {
        id: doctorValue,
      },
    };
    if (isEdit) {
      requestBody = {
        ...requestBody,
        id: selectedAvailableDate.id,
      };
    }

    onSubmitHandler(requestBody);
    setDoctorValue("");
    setAvailableDateValue(dayjs(new Date()));
  };

  return (
    <div className="form-div">
      <h2>{`${isEdit ? "Edit" : "Create"} Available Date`}</h2>
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          label="Date"
          value={availableDateValue}
          onChange={(newValue) => setAvailableDateValue(newValue)}
        />
      </LocalizationProvider>

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

export default AvailableDateFormComponent;
