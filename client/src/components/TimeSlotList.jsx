import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TimeSlotList = () => {
  const appointments = useSelector((state) => state.appointments.appointments); // Ensure correct state path

  return (
    <List>
      {appointments.length > 0 ? (
        appointments.map((apt) => (
          <ListItem key={apt._id} sx={{ borderBottom: "1px solid #ccc" }}>
            <ListItemText
              primary={`Time Slot: ${apt.timeSlot}`}
              secondary={`Patient: ${apt.firstName} ${apt.lastName}`}
            />
            <Button variant="outlined">
              <Link to={`/appointment/${apt._id}`} style={{ textDecoration: "none" }}>
                View Details
              </Link>
            </Button>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No appointments scheduled yet." />
        </ListItem>
      )}
    </List>
  );
};

export default TimeSlotList;
