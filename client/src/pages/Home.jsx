import React from "react";
import { Container, Typography } from "@mui/material";
import AppointmentForm from "../components/AppointmentForm";
import TimeSlotList from "../components/TimeSlotList";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Appointment Scheduler
      </Typography>
      {/* <AppointmentForm /> */}
      <TimeSlotList />
    </Container>
  );
};

export default Home;
