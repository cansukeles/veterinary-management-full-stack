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

import DoctorFormComponent from "../components/DoctorFormComponent";
import AvailableDateFormComponent from "../components/AvailableDateFormComponent";
import SnackbarComponent from "../components/SnackbarComponent";
import {
  deleteDoctor,
  updateDoctor,
  createDoctor,
  fetchDoctors,
  fetchAvailableDates,
  createAvailableDate,
  updateAvailableDate,
  deleteAvailableDate,
} from "../redux";
import "../index.css";
import { formatDateForTable } from "../utils";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "mail", label: "Email", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "city", label: "City", minWidth: 100 },
  { id: "edit", label: "", minWidth: 100 },
  { id: "delete", label: "", minWidth: 100 },
];

const availableDateColumns = [
  { id: "date", label: "Date", minWidth: 170 },
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

const DoctorsPage = () => {
  const dispatch = useDispatch();
  const doctorsData = useSelector((state) => state.doctors);
  const availableDatesData = useSelector((state) => state.availableDates);

  const [availableDates, setAvailableDates] = useState([]);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [availableDatesPage, setAvailableDatesPage] = useState(0);
  const [availableDatesRowsPerPage, setAvailableDatesRowsPerPage] =
    useState(10);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenModal = (customer) => {
    setSelectedDoctor(customer);
    setOpenEditModal(true);
  };
  const handleCloseModal = () => setOpenEditModal(false);

  const [selectedAvailableDate, setSelectedAvailableDate] = useState(null);
  const [openEditAvailableDateModal, setOpenEditAvailableDateModal] =
    useState(false);
  const handleOpenAvailableDateModal = (availableDate) => {
    setSelectedAvailableDate(availableDate);
    setOpenEditAvailableDateModal(true);
  };
  const handleClosedAvailableDateModal = () =>
    setOpenEditAvailableDateModal(false);

  const handleCreateDoctor = async (requestBody) => {
    if (
      !requestBody.name ||
      !requestBody.phone ||
      !requestBody.mail ||
      !requestBody.address ||
      !requestBody.city
    ) {
      setSnackbarMessage("Please fill all the fields!");
      handleOpenSnackbar();
      return;
    }
    try {
      await dispatch(createDoctor(requestBody)).unwrap();
      setSnackbarMessage("Doctor is created.");
    } catch (err) {
      console.error("Failed to create doctor: ", err);
      setSnackbarMessage("Failed to create doctor.");
    } finally {
      handleOpenSnackbar();
    }
  };

  const handleUpdateDoctor = async (requestBody) => {
    if (
      !requestBody.name ||
      !requestBody.phone ||
      !requestBody.mail ||
      !requestBody.address ||
      !requestBody.city
    ) {
      setSnackbarMessage("Please fill all the fields!");
      handleOpenSnackbar();
      return;
    }
    try {
      await dispatch(updateDoctor(requestBody)).unwrap();
      setSnackbarMessage("Doctor is updated.");
    } catch (err) {
      console.error("Failed to update the doctor: ", err);
      setSnackbarMessage("Failed to update the doctor.");
    } finally {
      handleCloseModal();
      handleOpenSnackbar();
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await dispatch(deleteDoctor(id));
      setSnackbarMessage("Doctor is deleted.");
    } catch (err) {
      console.error("Failed to delete the doctor: ", err);
      setSnackbarMessage("Failed to delete the doctor.");
    } finally {
      handleOpenSnackbar();
    }
  };

  const handleCreateAvailableDate = async (requestBody) => {
    try {
      await dispatch(createAvailableDate(requestBody)).unwrap();
      setSnackbarMessage("Available date is created.");
    } catch (err) {
      console.error("Failed to create available date: ", err);
      setSnackbarMessage("Failed to create available date.");
    }
  };

  const handleUpdateAvailableDate = async (requestBody) => {
    try {
      await dispatch(updateAvailableDate(requestBody)).unwrap();
      setSnackbarMessage("Available date is updated.");
    } catch (err) {
      console.error("Failed to update the available date: ", err);
      setSnackbarMessage("Failed to update the available date.");
    } finally {
      handleClosedAvailableDateModal();
    }
  };

  const handleDeleteAvailableDate = async (id) => {
    try {
      await dispatch(deleteAvailableDate(id));
      setSnackbarMessage("Available date is deleted.");
    } catch (err) {
      console.error("Failed to delete the available date: ", err);
      setSnackbarMessage("Failed to delete the available date.");
    }
  };

  // get data on page load
  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchAvailableDates());
  }, [dispatch]);

  useEffect(() => {
    const data = availableDatesData.items.map((availableDate) => {
      return {
        id: availableDate.id,
        date: availableDate.availableDate,
        doctor: availableDate.doctor,
      };
    });
    setAvailableDates(data);
  }, [availableDatesData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAvailableDateChangePage = (event, newPage) => {
    setAvailableDatesPage(newPage);
  };
  const handleAvailableDateChangeRowsPerPage = (event) => {
    setAvailableDatesRowsPerPage(+event.target.value);
    setAvailableDatesPage(0);
  };

  return (
    <div>
      <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <h2 style={{ marginLeft: "16px" }}>Doctor List </h2>
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
              {/* doctor list */}
              <TableBody>
                {doctorsData.items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow
                        key={rowIndex}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.mail}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.city}</TableCell>

                        <TableCell>
                          <IconButton onClick={() => handleOpenModal(row)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDeleteDoctor(row.id)}
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
            count={doctorsData.items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <div style={{ height: 20 }} />
        {/* new doctor form */}
        <DoctorFormComponent
          isEdit={false}
          onSubmitHandler={handleCreateDoctor}
        />
        {/* update doctor form */}
        <Modal open={openEditModal} onClose={handleCloseModal}>
          <Box style={modalStyle}>
            <DoctorFormComponent
              isEdit
              onSubmitHandler={handleUpdateDoctor}
              selectedDoctor={selectedDoctor}
            />
          </Box>
        </Modal>
      </div>
      <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <h2 style={{ marginLeft: "16px" }}>Available Date List </h2>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ borderBottom: "1px solid gray" }}>
                  {availableDateColumns.map((column) => (
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
              {/* available date list */}
              <TableBody>
                {availableDates
                  .slice(
                    availableDatesPage * availableDatesRowsPerPage,
                    availableDatesPage * availableDatesRowsPerPage +
                      availableDatesRowsPerPage
                  )
                  .map((row, rowIndex) => {
                    return (
                      <TableRow
                        key={rowIndex}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell>{row.doctor.name}</TableCell>
                        <TableCell>
                          {formatDateForTable(row.date, false)}
                        </TableCell>

                        <TableCell>
                          <IconButton
                            onClick={() => handleOpenAvailableDateModal(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDeleteAvailableDate(row.id)}
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
            count={availableDates.length}
            rowsPerPage={availableDatesRowsPerPage}
            page={availableDatesPage}
            onPageChange={handleAvailableDateChangePage}
            onRowsPerPageChange={handleAvailableDateChangeRowsPerPage}
          />
        </Paper>
        <div style={{ height: 20 }} />

        {/* new avaiable date form */}
        <AvailableDateFormComponent
          isEdit={false}
          onSubmitHandler={handleCreateAvailableDate}
        />
        {/* edit avaiable date form */}
        <Modal
          open={openEditAvailableDateModal}
          onClose={handleClosedAvailableDateModal}
        >
          <Box style={modalStyle}>
            <AvailableDateFormComponent
              isEdit
              onSubmitHandler={handleUpdateAvailableDate}
              selectedAvailableDate={selectedAvailableDate}
            />
          </Box>
        </Modal>
      </div>
      <SnackbarComponent snackbarMessage={snackbarMessage} />
    </div>
  );
};

export default DoctorsPage;
