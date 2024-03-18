import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../utils/axios-config";

// get all appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async () => {
    const res = await axiosInstance.get("/appointments");
    return res.data;
  }
);

// get all appointments by date and animal filtering
export const fetchAppointmentsByDateAndAnimal = createAsyncThunk(
  "appointments/getAppointmentsByDateAndAnimal",
  async (requestBody) => {
    const res = await axiosInstance.get(
      `/appointments/available-date-and-animal?startDate=${requestBody.startDate}&endDate=${requestBody.endDate}&animalName=${requestBody.animal}`
    );
    return res.data;
  }
);

// get all appointments by date and doctor filtering
export const fetchAppointmentsByDateAndDoctor = createAsyncThunk(
  "appointments/getAppointmentsByDateAndDoctor",
  async (requestBody) => {
    const res = await axiosInstance.get(
      `/appointments/available-date-and-doctor?startDate=${requestBody.startDate}&endDate=${requestBody.endDate}&doctorName=${requestBody.doctor}`
    );
    return res.data;
  }
);

// create new appointment
export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (requestBody) => {
    const response = await axiosInstance.post("/appointments", requestBody);
    return response.data;
  }
);

// update new appointment
export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async (requestBody) => {
    const response = await axiosInstance.put("/appointments", requestBody);
    return response.data;
  }
);

// delete new appointment
export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (id) => {
    const response = await axiosInstance.delete(`/appointments/${id}`);
    return response.data;
  }
);

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAppointmentsByDateAndAnimal.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.items.push(action.payload);
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        // state.items.push(action.payload);
        let tempArr = [...state.items];
        const itemIndex = tempArr.findIndex((p) => p.id === action.payload.id);
        tempArr[itemIndex] = action.payload;
        state.items = tempArr;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (arrow) => arrow.id !== action.meta.arg
        );
      }),
});

export default appointmentsSlice.reducer;
