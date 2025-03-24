import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../redux/slices/appointmentSlice";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const AppointmentForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.appointments);

  const [formData, setFormData] = useState({
    timeSlot: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userId: "", // Get from logged-in user
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(bookAppointment(formData));
  };

  return (
    <Box sx={{ width: 400, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Book an Appointment</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Time Slot" name="timeSlot" onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="First Name" name="firstName" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Last Name" name="lastName" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Phone Number" name="phoneNumber" onChange={handleChange} required />
        <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </Button>
      </form>
    </Box>
  );
};

export default AppointmentForm;
