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

import ReportFormComponent from "../components/ReportFormComponent";
import SnackbarComponent from "../components/SnackbarComponent";
import {
  fetchAppointments,
  deleteReport,
  updateReport,
  fetchReports,
  fetchVaccines,
  createReport,
} from "../redux";
import { formatDateForTable } from "../utils";
import "../index.css";

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "animal", label: "Animal", minWidth: 170 },
  { id: "doctor", label: "Doctor", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "diagnosis", label: "Diagnosis", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "vaccineList", label: "Vaccines", minWidth: 100 },
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

const ReportsPage = () => {
  const dispatch = useDispatch();
  const reportsData = useSelector((state) => state.reports);

  const [snackbarMessage, setSnackbarMessage] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedReport, setSelectedReport] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setOpenEditModal(true);
  };
  const handleCloseModal = () => setOpenEditModal(false);

  const handleCreateReport = async (requestBody) => {
    try {
      await dispatch(createReport(requestBody)).unwrap();
      setSnackbarMessage("Report is created.");
    } catch (err) {
      console.error("Failed to create report: ", err);
      setSnackbarMessage("Failed to create report.");
    } finally {
      dispatch(fetchReports());
    }
  };

  const handleUpdateReport = async (requestBody) => {
    try {
      await dispatch(updateReport(requestBody)).unwrap();
      setSnackbarMessage("Report is updated.");
    } catch (err) {
      console.error("Failed to update the report: ", err);
      setSnackbarMessage("Failed to update the report.");
    } finally {
      handleCloseModal();
      dispatch(fetchReports());
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      await dispatch(deleteReport(id));
      setSnackbarMessage("Report is deleted.");
    } catch (err) {
      console.error("Failed to delete the report: ", err);
      setSnackbarMessage("Failed to delete the report.");
    }
  };

  // get data on page load
  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchVaccines());
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h2 style={{ marginLeft: "16px" }}>Report List </h2>
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
            {/* list reports */}
            <TableBody>
              {reportsData.items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow
                      key={rowIndex}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.appointmentDto.animalDto.name}</TableCell>
                      <TableCell>{row.appointmentDto.doctorDto.name}</TableCell>
                      <TableCell>
                        {formatDateForTable(row.appointmentDto.appointmentDate)}
                      </TableCell>
                      <TableCell>{row.diagnosis}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>
                        {row.vaccineList
                          .map(function (vac) {
                            return vac.code;
                          })
                          .join(",")}
                      </TableCell>
                      {/* {row.vaccineList.map((vac, vacIndex) => (
                        <TableCell key={vacIndex}>{vac.code}</TableCell>
                      ))} */}

                      <TableCell>
                        <IconButton onClick={() => handleOpenModal(row)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteReport(row.id)}>
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
          count={reportsData.items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ height: 20 }} />
      {/* new report form */}
      <ReportFormComponent
        isEdit={false}
        onSubmitHandler={handleCreateReport}
      />
      {/* edit report form */}
      <Modal
        open={openEditModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={modalStyle}>
          <ReportFormComponent
            isEdit
            onSubmitHandler={handleUpdateReport}
            selectedReport={selectedReport}
          />
        </Box>
      </Modal>
      <SnackbarComponent snackbarMessage={snackbarMessage} />
    </div>
  );
};

export default ReportsPage;
