import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Typography, Card, CardContent } from "@mui/material";

const AppointmentDetails = () => {
  const { id } = useParams();

  const appointment = useSelector((state) =>
    state.appointments?.appointments?.find(
      (apt) => String(apt._id) === String(id)
    )
  );

  if (!appointment) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Appointment not found or still loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card sx={{ my: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5">Appointment Details</Typography>
          <hr />
          <Typography variant="h6">
            Patient: {appointment.firstName} {appointment.lastName}
          </Typography>
          <Typography variant="body1">Time: {appointment.timeSlot}</Typography>
          <Typography variant="body1">
            Phone Number: {appointment.phoneNumber}
          </Typography>
          <Typography variant="body1">
            Booking:{" "}
            {appointment.isBooked=== "True" ? "No" : "Yes"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AppointmentDetails;
