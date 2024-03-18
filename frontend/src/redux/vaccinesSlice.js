import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../utils/axios-config";

// get all vaccines
export const fetchVaccines = createAsyncThunk(
  "vaccines/getVaccines",
  async () => {
    const res = await axiosInstance.get("/vaccines");
    return res.data;
  }
);

// get all vaccines by animal filtering
export const fetchVaccinesByAnimal = createAsyncThunk(
  "vaccines/getVaccinesByAnimal",
  async (animalId) => {
    const res = await axiosInstance.get(`/vaccines/get-by-animal/${animalId}`);
    return res.data;
  }
);

// get all vaccines by date filtering
export const fetchVaccinesByDates = createAsyncThunk(
  "vaccines/getVaccinesByDates",
  async (requestBody) => {
    const res = await axiosInstance.get(
      `/vaccines/filter-by-date?startDate=${requestBody.startDate}&endDate=${requestBody.endDate}`
    );
    return res.data;
  }
);

// create new vaccine
export const createVaccine = createAsyncThunk(
  "vaccines/createVaccine",
  async (requestBody) => {
    const response = await axiosInstance.post("/vaccines", requestBody);
    return response.data;
  }
);

// update a vaccine
export const updateVaccine = createAsyncThunk(
  "vaccines/updateVaccine",
  async (requestBody) => {
    const response = await axiosInstance.put("/vaccines", requestBody);
    return response.data;
  }
);

// delete a vaccine
export const deleteVaccine = createAsyncThunk(
  "vaccines/deleteVaccine",
  async (id) => {
    const response = await axiosInstance.delete(`/vaccines/${id}`);
    return response.data;
  }
);

export const vaccinesSlice = createSlice({
  name: "vaccines",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchVaccines.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchVaccinesByAnimal.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchVaccinesByDates.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createVaccine.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.items.push(action.payload);
      })
      .addCase(updateVaccine.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        // state.items.push(action.payload);
        let tempArr = [...state.items];
        const itemIndex = tempArr.findIndex((p) => p.id === action.payload.id);
        tempArr[itemIndex] = action.payload;
        state.items = tempArr;
      })
      .addCase(deleteVaccine.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (arrow) => arrow.id !== action.meta.arg
        );
      }),
});

export default vaccinesSlice.reducer;
