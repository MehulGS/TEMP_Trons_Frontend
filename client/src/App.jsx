import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AppointmentDetails from "./pages/AppointmentDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ element }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment/:id" element={<PrivateRoute element={<AppointmentDetails />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
