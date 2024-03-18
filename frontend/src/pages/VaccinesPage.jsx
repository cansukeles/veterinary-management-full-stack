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

import VaccineFormComponent from "../components/VaccineFormComponent";
import VaccineFilterComponent from "../components/VaccineFilterComponent";
import {
  fetchAnimals,
  deleteVaccine,
  updateVaccine,
  fetchVaccines,
  createVaccine,
  fetchVaccinesByAnimal,
  fetchVaccinesByDates,
} from "../redux";
import { formatDateForTable } from "../utils";
import "../index.css";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "Code", minWidth: 170 },
  { id: "animal", label: "Animal", minWidth: 170 },
  { id: "protectionStartDate", label: "Protection Start Date", minWidth: 170 },
  { id: "protectionFinishDate", label: "Protection End Date", minWidth: 100 },
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

const VaccinesPage = () => {
  const dispatch = useDispatch();
  const vaccinesData = useSelector((state) => state.vaccines);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenModal = (vaccine) => {
    setSelectedVaccine(vaccine);
    setOpenEditModal(true);
  };
  const handleCloseModal = () => setOpenEditModal(false);

  const handleFilterByAnimal = async (animalId) => {
    try {
      await dispatch(fetchVaccinesByAnimal(animalId)).unwrap();
    } catch (err) {
      console.error("Failed to filter vaccines: ", err);
    }
  };

  const handleFilterByDate = async (requestBody) => {
    try {
      await dispatch(fetchVaccinesByDates(requestBody)).unwrap();
    } catch (err) {
      console.error("Failed to filter vaccines: ", err);
    }
  };

  const handleCreateVaccine = async (requestBody) => {
    try {
      await dispatch(createVaccine(requestBody)).unwrap();
    } catch (err) {
      console.error("Failed to create vaccine: ", err);
    }
  };

  const handleUpdateVaccine = async (requestBody) => {
    try {
      await dispatch(updateVaccine(requestBody)).unwrap();
    } catch (err) {
      console.error("Failed to update the vaccine: ", err);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteVaccine = async (id) => {
    try {
      await dispatch(deleteVaccine(id));
    } catch (err) {
      console.error("Failed to delete the vaccine: ", err);
    }
  };

  // get data on page load
  useEffect(() => {
    dispatch(fetchAnimals());
    dispatch(fetchVaccines());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // reset filter values
  const handleFilterReset = () => {
    dispatch(fetchVaccines());
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h2 style={{ marginLeft: "16px" }}>Vaccine List </h2>
        <VaccineFilterComponent
          onAnimalSubmitHandler={handleFilterByAnimal}
          onDatesSubmitHandler={handleFilterByDate}
          onResetHandler={handleFilterReset}
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
            {/* list vaccines */}
            <TableBody>
              {vaccinesData.items
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
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.animalDto.name}</TableCell>
                      <TableCell>
                        {formatDateForTable(row.protectionStartDate, false)}
                      </TableCell>
                      <TableCell>
                        {formatDateForTable(row.protectionFinishDate, false)}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenModal(row)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteVaccine(row.id)}>
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
          count={vaccinesData.items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ height: 20 }} />

      {/* new vaccine form */}
      <VaccineFormComponent
        isEdit={false}
        onSubmitHandler={handleCreateVaccine}
      />
      {/* edit vaccine form */}
      <Modal open={openEditModal} onClose={handleCloseModal}>
        <Box style={modalStyle}>
          <VaccineFormComponent
            isEdit
            onSubmitHandler={handleUpdateVaccine}
            selectedVaccine={selectedVaccine}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default VaccinesPage;
