import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch appointments
export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Book an appointment
export const bookAppointment = createAsyncThunk(
  "appointments/bookAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      };
      const response = await axios.post("http://localhost:5000/api/appointments", appointmentData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Edit an appointment
export const editAppointment = createAsyncThunk(
  "appointments/editAppointment",
  async ({ timeSlot, newData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      };
      const response = await axios.put(`http://localhost:5000/api/appointments/${timeSlot}`, newData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete an appointment
export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (timeSlot, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`http://localhost:5000/api/appointments/${timeSlot}`, config);
      return timeSlot;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: { appointments: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(editAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex((apt) => apt.timeSlot === action.payload.timeSlot);
        if (index !== -1) state.appointments[index] = action.payload;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter((apt) => apt.timeSlot !== action.payload);
      });
  },
});

export default appointmentSlice.reducer;
