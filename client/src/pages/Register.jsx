import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="First Name" name="firstName" onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Last Name" name="lastName" onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} required />
        <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Container>
  );
};

export default Register;
