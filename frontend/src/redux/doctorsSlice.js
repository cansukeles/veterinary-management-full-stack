import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../utils/axios-config";

// get all doctors
export const fetchDoctors = createAsyncThunk("doctors/getDoctors", async () => {
  const res = await axiosInstance.get("/doctors");
  return res.data;
});

// create new doctor
export const createDoctor = createAsyncThunk(
  "doctors/createDoctor",
  async (requestBody) => {
    const response = await axiosInstance.post("/doctors", requestBody);
    return response.data;
  }
);

// update a doctor
export const updateDoctor = createAsyncThunk(
  "doctors/updateDoctor",
  async (requestBody) => {
    const response = await axiosInstance.put("/doctors", requestBody);
    return response.data;
  }
);

// delete a doctor
export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (id) => {
    const response = await axiosInstance.delete(`/doctors/${id}`);
    return response.data;
  }
);

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.items.push(action.payload);
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        // state.items.push(action.payload);
        let tempArr = [...state.items];
        const itemIndex = tempArr.findIndex((p) => p.id === action.payload.id);
        tempArr[itemIndex] = action.payload;
        state.items = tempArr;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (arrow) => arrow.id !== action.meta.arg
        );
      }),
});

export default doctorsSlice.reducer;
