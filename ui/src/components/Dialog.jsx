import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PokeForm } from "./PokeForm/PokeForm";

export default function DialogSelect({ open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") setOpen(false);
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Title
      </DialogTitle>

      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <PokeForm handleClose={handleClose} />
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
