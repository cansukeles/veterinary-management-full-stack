import { useState, useEffect } from "react";
// mui
import { Box, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "../index.css";
import { formatDateForTable } from "../utils";

const SnackbarComponent = ({ snackbarMessage, isSnackbarOpen }) => {
  // snackbar functionalities
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (snackbarMessage) {
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  }, [snackbarMessage]);

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

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      message={snackbarMessage}
      action={action}
    />
  );
};

export default SnackbarComponent;
