import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Appointment Scheduler
          </Link>
        </Typography>
        {token ? (
          <Button color="inherit" onClick={() => dispatch(logoutUser())}>Logout</Button>
        ) : (
          <>
            <Button color="inherit"><Link to="/login" style={{ textDecoration: "none", color: "white" }}>Login</Link></Button>
            <Button color="inherit"><Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register</Link></Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
