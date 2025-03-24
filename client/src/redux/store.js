import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./slices/appointmentSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    auth:authReducer
  },
});

export default store;
