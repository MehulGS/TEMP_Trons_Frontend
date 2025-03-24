import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Typography, Card, CardContent } from "@mui/material";

const AppointmentDetails = () => {
  const { id } = useParams();
  const appointment = useSelector((state) =>
    state.appointment.appointments.find((apt) => apt.id === id)
  );

  if (!appointment) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Appointment not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card sx={{ my: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5">Appointment Details</Typography>
          <Typography variant="body1">Date: {appointment.date}</Typography>
          <Typography variant="body1">Time: {appointment.time}</Typography>
          <Typography variant="body1">Patient: {appointment.patient}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AppointmentDetails;
