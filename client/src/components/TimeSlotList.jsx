import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { getAppointments, deleteAppointment } from "../redux/slices/appointmentSlice";
import AppointmentForm from "./AppointmentForm";

const TimeSlotTable = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);

  const [openForm, setOpenForm] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const timeSlots = useMemo(() => {
    const slots = Array.from({ length: 9 }, (_, i) => `${9 + i}:00 AM`);
    slots[3] = "12:00 PM";
    for (let i = 4; i < 9; i++) {
      slots[i] = `${i - 3}:00 PM`;
    }
    return slots;
  }, []);

  const appointmentMap = useMemo(
    () => new Map(appointments.map((apt) => [apt.timeSlot, apt])),
    [appointments]
  );

  const handleOpenForm = (slot) => {
    setSelectedTimeSlot(slot);
    setAppointmentData(null);
    setOpenForm(true);
  };

  const handleEdit = (appointment) => {
    setAppointmentData(appointment);
    setOpenForm(true);
  };
  

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedTimeSlot("");
    setAppointmentData(null);
  };

  const handleDeleteClick = (timeSlot) => {
    setDeleteId(timeSlot);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteAppointment(deleteId));
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Time Slot</TableCell>
            <TableCell align="center">Patient</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((slot) => {
            const appointment = appointmentMap.get(slot);
            const isBooked = Boolean(appointment);

            return (
              <TableRow key={slot} sx={{ backgroundColor: isBooked ? "#ffcccc" : "transparent" }}>
                <TableCell align="center">{slot}</TableCell>
                <TableCell align="center">
                  {isBooked ? `${appointment.firstName} ${appointment.lastName}` : "Available"}
                </TableCell>
                <TableCell align="center">
                  {isBooked ? (
                    <>
                      <Button variant="contained" color="primary" component={Link} to={`/appointment/${appointment._id}`} aria-label="View Appointment">
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mx: 1 }}
                        onClick={() => handleEdit(appointment)}
                        aria-label="Edit Appointment"
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(appointment.timeSlot)}
                        aria-label="Delete Appointment"
                      >
                        🗑 Delete
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" color="success" onClick={() => handleOpenForm(slot)} aria-label="Book Appointment">
                      ➕ Book
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Modal for Appointment Form */}
      <Modal open={openForm} onClose={handleCloseForm}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 24 }}>
          <AppointmentForm selectedTimeSlot={selectedTimeSlot} onClose={handleCloseForm} appointmentData={appointmentData} />
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this appointment? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TimeSlotTable;