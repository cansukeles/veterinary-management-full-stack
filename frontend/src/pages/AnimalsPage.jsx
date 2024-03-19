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

import AnimalFormComponent from "../components/AnimalFormComponent";
import AnimalFilterComponent from "../components/AnimalFilterComponent";
import SnackbarComponent from "../components/SnackbarComponent";
import {
  deleteAnimal,
  createAnimal,
  updateAnimal,
  fetchAnimals,
  fetchCustomers,
  fetchAnimalsByName,
  fetchAnimalsByCustomerName,
} from "../redux";
import { formatDateForTable } from "../utils";
import "../index.css";

const columns = [
  { id: "name", label: "Name", minWidth: 130 },
  { id: "customer", label: "Customer", minWidth: 170 },
  { id: "species", label: "Species", minWidth: 130 },
  { id: "breed", label: "Breed", minWidth: 120 },
  { id: "gender", label: "Gender", minWidth: 120 },
  { id: "colour", label: "Colour", minWidth: 130 },
  { id: "dateOfBirth", label: "Date of Birth", minWidth: 100 },
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

const AnimalsPage = () => {
  const dispatch = useDispatch();
  const animalsData = useSelector((state) => state.animals);

  // snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenModal = (customer) => {
    setSelectedAnimal(customer);
    setOpenEditModal(true);
  };
  const handleCloseModal = () => setOpenEditModal(false);

  const handleFilterByName = async (name) => {
    try {
      await dispatch(fetchAnimalsByName(name)).unwrap();
    } catch (err) {
      console.error("Failed to filter animals: ", err);
    }
  };

  const handleFilterByCustomerName = async (name) => {
    try {
      await dispatch(fetchAnimalsByCustomerName(name)).unwrap();
    } catch (err) {
      console.error("Failed to filter animals: ", err);
    }
  };

  const handleCreateAnimal = async (requestBody) => {
    if (
      !requestBody.name ||
      !requestBody.species ||
      !requestBody.breed ||
      !requestBody.gender ||
      !requestBody.colour ||
      !requestBody.dateOfBirth
    ) {
      setSnackbarMessage("Please fill all the fields!");
      handleOpenSnackbar();
      return;
    }
    try {
      await dispatch(createAnimal(requestBody)).unwrap();
      setSnackbarMessage("Animal is created.");
    } catch (err) {
      console.error("Failed to create animal: ", err);
      setSnackbarMessage("Failed to create animal.");
    } finally {
      handleOpenSnackbar();
    }
  };

  const handleUpdateAnimal = async (requestBody) => {
    if (
      !requestBody.name ||
      !requestBody.species ||
      !requestBody.breed ||
      !requestBody.gender ||
      !requestBody.colour ||
      !requestBody.dateOfBirth
    ) {
      setSnackbarMessage("Please fill all the fields!");
      handleOpenSnackbar();
      return;
    }
    try {
      await dispatch(updateAnimal(requestBody)).unwrap();
      setSnackbarMessage("Animal is updated.");
    } catch (err) {
      console.error("Failed to update the animal: ", err);
      setSnackbarMessage("Failed to update the animal.");
    } finally {
      handleCloseModal();
      handleOpenSnackbar();
    }
  };

  const handleDeleteAnimal = async (id) => {
    try {
      await dispatch(deleteAnimal(id));
      setSnackbarMessage("Animal is deleted.");
    } catch (err) {
      console.error("Failed to delete the animal: ", err);
      setSnackbarMessage("Failed to delete the animal.");
    } finally {
      handleOpenSnackbar();
    }
  };

  // get data on page load
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchAnimals());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterReset = () => {
    dispatch(fetchAnimals());
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h2 style={{ marginLeft: "16px" }}>Animal List </h2>
        <AnimalFilterComponent
          onResetHandler={handleFilterReset}
          onNameSubmitHandler={handleFilterByName}
          onCustomerNameSubmitHandler={handleFilterByCustomerName}
        />
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
            <TableBody>
              {animalsData.items
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
                      <TableCell>{row.customerDto.name}</TableCell>
                      <TableCell>{row.species}</TableCell>
                      <TableCell>{row.breed}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.colour}</TableCell>
                      <TableCell>
                        {formatDateForTable(row.dateOfBirth, false)}
                      </TableCell>

                      <TableCell>
                        <IconButton onClick={() => handleOpenModal(row)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteAnimal(row.id)}>
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
          count={animalsData.items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ height: 20 }} />
      {/* create animal form */}
      <AnimalFormComponent
        isEdit={false}
        onSubmitHandler={handleCreateAnimal}
      />
      {/* edit animal form */}
      <Modal open={openEditModal} onClose={handleCloseModal}>
        <Box style={modalStyle}>
          <AnimalFormComponent
            isEdit
            onSubmitHandler={handleUpdateAnimal}
            selectedAnimal={selectedAnimal}
          />
        </Box>
      </Modal>
      <SnackbarComponent snackbarMessage={snackbarMessage} />
    </div>
  );
};

export default AnimalsPage;
