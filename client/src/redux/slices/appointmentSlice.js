import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const bookAppointment = createAsyncThunk(
  "appointments/bookAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/appointments", appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: { appointments: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload.appointment);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default appointmentSlice.reducer;
