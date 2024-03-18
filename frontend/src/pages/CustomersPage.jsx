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
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CustomerFormComponent from "../components/CustomerFormComponent";
import CustomerFilterComponent from "../components/CustomerFilterComponent";
import {
  deleteCustomer,
  updateCustomer,
  createCustomer,
  fetchCustomers,
  fetchCustomersByName,
} from "../redux";

import "../index.css";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "mail", label: "Email", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "city", label: "City", minWidth: 100 },
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

const CustomersPage = () => {
  const dispatch = useDispatch();
  const customersData = useSelector((state) => state.customers);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const action = (
    <Box>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setOpenEditModal(true);
  };
  const handleCloseModal = () => setOpenEditModal(false);

  const handleFilterByName = async (name) => {
    try {
      await dispatch(fetchCustomersByName(name)).unwrap();
    } catch (err) {
      console.error("Failed to filter vaccines: ", err);
    }
  };

  const handleCreateCustomer = async (requestBody) => {
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
      await dispatch(createCustomer(requestBody)).unwrap();
      setSnackbarMessage("Customer is created.");
    } catch (err) {
      console.error("Failed to create customer: ", err);
    } finally {
      handleOpenSnackbar();
    }
  };

  const handleUpdateCustomer = async (requestBody) => {
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
      await dispatch(updateCustomer(requestBody)).unwrap();
      setSnackbarMessage("Customer is updated.");
    } catch (err) {
      console.error("Failed to update the customer: ", err);
    } finally {
      handleCloseModal();
      handleOpenSnackbar();
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await dispatch(deleteCustomer(id));
      setSnackbarMessage("Customer is deleted.");
    } catch (err) {
      console.error("Failed to delete the customer: ", err);
    } finally {
      handleOpenSnackbar();
    }
  };

  // get data on page load
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterReset = () => {
    dispatch(fetchCustomers());
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h2 style={{ marginLeft: "16px" }}>Customer List </h2>
        <CustomerFilterComponent
          onResetHandler={handleFilterReset}
          onNameSubmitHandler={handleFilterByName}
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
            {/* customer list */}
            <TableBody>
              {customersData.items
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
                          onClick={() => handleDeleteCustomer(row.id)}
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
          count={customersData.items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ height: 20 }} />
      {/* new customer form */}
      <CustomerFormComponent
        isEdit={false}
        onSubmitHandler={handleCreateCustomer}
      />
      {/* edit customer form */}
      <Modal open={openEditModal} onClose={handleCloseModal}>
        <Box style={modalStyle}>
          <CustomerFormComponent
            isEdit
            onSubmitHandler={handleUpdateCustomer}
            selectedCustomer={selectedCustomer}
          />
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={action}
      />
    </div>
  );
};

export default CustomersPage;
