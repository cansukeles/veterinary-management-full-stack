import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// mui
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AppointmentFormComponent from "../components/AppointmentFormComponent";
import AppointmentFilterComponent from "../components/AppointmentFilterComponent";
import {
  fetchAnimals,
  fetchDoctors,
  fetchAvailableDates,
  createAppointment,
  fetchAppointments,
  deleteAppointment,
  updateAppointment,
  fetchAppointmentsByDateAndAnimal,
  fetchAppointmentsByDateAndDoctor,
} from "../redux";
import { formatDateForTable } from "../utils";
import "../index.css";

const columns = [
  { id: "date", label: "Date", minWidth: 170 },
  { id: "animal", label: "Animal", minWidth: 100 },
  { id: "doctor", label: "Doctor", minWidth: 100 },
  { id: "edit", label: "", minWidth: 100 },
  { id: "delete", label: "", minWidth: 100 },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#000",
  background: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const appointmentsData = useSelector((state) => state.appointments);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [appointments, setAppointments] = useState([]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenEditModal(true);
  };
  const handleCloseModal = () => setOpenEditModal(false);

  const handleFilterByAnimal = async (requestBody) => {
    try {
      await dispatch(fetchAppointmentsByDateAndAnimal(requestBody)).unwrap();
    } catch (err) {
      console.error("Failed to filter appointments: ", err);
    }
  };

  const handleCreateAppointment = async (requestBody) => {
    try {
      await dispatch(createAppointment(requestBody)).unwrap();
    } catch (err) {
      console.error("Failed to create appointment: ", err);
    }
  };

  const handleUpdateAppointment = async (requestBody) => {
    try {
      await dispatch(updateAppointment(requestBody)).unwrap();
    } catch (err) {
      console.error("Failed to update the appointment: ", err);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await dispatch(deleteAppointment(id));
    } catch (err) {
      console.error("Failed to delete the appointment: ", err);
    }
  };

  // fetch data on page load
  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchAnimals());
    dispatch(fetchDoctors());
    dispatch(fetchAvailableDates());
  }, [dispatch]);

  useEffect(() => {
    const data = appointmentsData.items.map((appointment) => {
      return {
        id: appointment.id,
        date: appointment.appointmentDate,
        doctor: appointment.doctorDto,
        animal: appointment.animalDto,
      };
    });
    setAppointments(data);
  }, [appointmentsData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterReset = () => {
    dispatch(fetchAppointments());
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h2 style={{ marginLeft: "16px" }}>Appointment List </h2>
        <div>
          <AppointmentFilterComponent
            onAnimalSubmitHandler={handleFilterByAnimal}
            onDoctorSubmitHandler={fetchAppointmentsByDateAndDoctor}
            onResetHandler={handleFilterReset}
          />
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ borderBottom: "1px solid gray" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ borderBottom: "none" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* appointment list */}
            <TableBody>
              {appointments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow
                      key={rowIndex}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell>{formatDateForTable(row.date)}</TableCell>
                      <TableCell>{row.animal.name}</TableCell>
                      <TableCell>{row.doctor.name}</TableCell>

                      <TableCell>
                        <IconButton onClick={() => handleOpenModal(row)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteAppointment(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ height: 20 }} />

      {/* create appointment form */}
      <AppointmentFormComponent
        isEdit={false}
        onSubmitHandler={handleCreateAppointment}
      />
      {/* edit appointment form */}
      <Modal
        open={openEditModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={modalStyle}>
          <AppointmentFormComponent
            isEdit
            onSubmitHandler={handleUpdateAppointment}
            selectedAppointment={selectedAppointment}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AppointmentsPage;
