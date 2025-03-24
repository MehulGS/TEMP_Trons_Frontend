import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment, editAppointment } from "../redux/slices/appointmentSlice";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

const AppointmentForm = ({ selectedTimeSlot, onClose, appointmentData }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.appointments);

  const [formData, setFormData] = useState({
    timeSlot: selectedTimeSlot,
    firstName: appointmentData?.firstName || "",
    lastName: appointmentData?.lastName || "",
    phoneNumber: appointmentData?.phoneNumber || "",
    userId: appointmentData?.userId || "", 
  });

  useEffect(() => {
    if (appointmentData) {
      setFormData({
        timeSlot: appointmentData?.timeSlot || selectedTimeSlot, 
        firstName: appointmentData?.firstName || "",
        lastName: appointmentData?.lastName || "",
        phoneNumber: appointmentData?.phoneNumber || "",
        userId: appointmentData?.userId || "", 
      });
    }
  }, [appointmentData, selectedTimeSlot]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appointmentData) {
      dispatch(editAppointment({ timeSlot: formData.timeSlot, newData: formData }));
    } else {
      dispatch(bookAppointment(formData));
    }
    onClose();
  };
  

  return (
    <Box sx={{ width: 400, mx: "auto", p: 3 }}>
      <Typography variant="h5" mb={2}>
        {appointmentData ? "Edit Appointment" : "Book an Appointment"}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Time Slot"
          name="timeSlot"
          value={formData.timeSlot}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Saving..." : appointmentData ? "Update Appointment" : "Book Appointment"}
        </Button>
        <Button fullWidth variant="outlined" color="secondary" onClick={onClose} sx={{ mt: 1 }}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AppointmentForm;
