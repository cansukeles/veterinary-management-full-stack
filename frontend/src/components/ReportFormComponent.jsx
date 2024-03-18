import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// mui
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  TextField,
  Box,
  OutlinedInput,
  Chip,
  useTheme,
} from "@mui/material";

import "../index.css";
import { formatDateForTable } from "../utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, vaccine, theme) {
  return {
    fontWeight:
      vaccine.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ReportFormComponent = ({ isEdit, onSubmitHandler, selectedReport }) => {
  const theme = useTheme();

  const vaccinesData = useSelector((state) => state.vaccines);
  const appointmentsData = useSelector((state) => state.appointments);

  const [titleValue, setTitleValue] = useState("");
  const [diagnosisValue, setDiagnosisValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [appointmentValue, setAppointmentValue] = useState("");
  const [vaccineValues, setVaccineValues] = useState([]);

  useEffect(() => {
    if (selectedReport) {
      setTitleValue(selectedReport.title);
      setDiagnosisValue(selectedReport.diagnosis);
      setPriceValue(selectedReport.price);
      setAppointmentValue(selectedReport.appointmentDto);
      setVaccineValues(selectedReport.vaccineList.map((vaccine) => vaccine.id));
    }
  }, [selectedReport]);

  const handleVaccinesFormChange = (event) => {
    const {
      target: { value },
    } = event;
    setVaccineValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleAppointmentFormChange = (event) => {
    setAppointmentValue(event.target.value);
  };
  const handleTitleFormChange = (event) => {
    setTitleValue(event.target.value);
  };
  const handleDiagnosisFormChange = (event) => {
    setDiagnosisValue(event.target.value);
  };
  const handlePriceFormChange = (event) => {
    setPriceValue(event.target.value);
  };

  const handleSubmit = () => {
    const vaccineList = vaccineValues.map((vac) => {
      return { id: vac };
    });
    let requestBody = {
      title: titleValue,
      diagnosis: diagnosisValue,
      price: parseFloat(priceValue),
      appointment: {
        id: appointmentValue.id,
      },
      vaccineList,
    };
    if (isEdit) {
      requestBody = {
        ...requestBody,
        id: selectedReport.id,
      };
    }

    // console.log(requestBody);
    onSubmitHandler(requestBody);
    setAppointmentValue("");
    setTitleValue("");
    setPriceValue(0);
    setDiagnosisValue("");
    setVaccineValues([]);
  };

  return (
    <div className="form-div">
      <h2>{`${isEdit ? "Edit" : "Create"} Report`}</h2>
      <TextField
        fullWidth
        label="Title"
        onChange={handleTitleFormChange}
        value={titleValue}
      />
      <TextField
        fullWidth
        label="Diagnosis"
        onChange={handleDiagnosisFormChange}
        value={diagnosisValue}
      />
      <TextField
        fullWidth
        label="Price"
        type="number"
        onChange={handlePriceFormChange}
        value={priceValue}
      />
      <FormControl fullWidth>
        <InputLabel>Appointment</InputLabel>
        <Select
          value={appointmentValue}
          label="Appointment"
          onChange={handleAppointmentFormChange}
        >
          {appointmentsData.items.map((appointment, index) => (
            <MenuItem key={index} value={appointment}>
              {`${appointment.animalDto.name} - ${
                appointment.doctorDto.name
              } - ${formatDateForTable(appointment.appointmentDate)}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel>Vaccines</InputLabel>
        <Select
          disabled={!appointmentValue}
          multiple
          value={vaccineValues}
          onChange={handleVaccinesFormChange}
          input={<OutlinedInput label="Vaccines" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={vaccinesData.items.find((p) => value === p.id).code}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {vaccinesData.items
            .filter(
              (vac) =>
                !vac.reportId &&
                // appointmentValue && appointmentValue.animalDto && appointmentValue.animalDto.id &&
                appointmentValue?.animalDto?.id &&
                vac.animalDto.id === appointmentValue.animalDto.id
            )
            .map((vaccine, index) => (
              <MenuItem
                key={index}
                value={vaccine.id}
                style={getStyles(name, vaccineValues, theme)}
              >
                {`${vaccine.name} - ${vaccine.code}`}
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

export default ReportFormComponent;
