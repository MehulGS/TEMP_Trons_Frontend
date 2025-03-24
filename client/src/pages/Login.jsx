import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} required />
        <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
