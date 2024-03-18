import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../utils/axios-config";

// get all available dates
export const fetchAvailableDates = createAsyncThunk(
  "availableDates/getAvailableDates",
  async () => {
    const res = await axiosInstance.get("/available-dates");
    return res.data;
  }
);

// create new available date
export const createAvailableDate = createAsyncThunk(
  "availableDates/createAvailableDate",
  async (requestBody) => {
    const response = await axiosInstance.post("/available-dates", requestBody);
    return response.data;
  }
);

// update an available date
export const updateAvailableDate = createAsyncThunk(
  "availableDates/updateAvailableDates",
  async (requestBody) => {
    const response = await axiosInstance.put("/available-dates", requestBody);
    return response.data;
  }
);

// delete an available date
export const deleteAvailableDate = createAsyncThunk(
  "availableDates/deleteAvailableDates",
  async (id) => {
    const response = await axiosInstance.delete(`/available-dates/${id}`);
    return response.data;
  }
);

export const availableDatesSlice = createSlice({
  name: "availableDates",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAvailableDates.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createAvailableDate.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.items.push(action.payload);
      })
      .addCase(updateAvailableDate.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        // state.items.push(action.payload);
        let tempArr = [...state.items];
        const itemIndex = tempArr.findIndex((p) => p.id === action.payload.id);
        tempArr[itemIndex] = action.payload;
        state.items = tempArr;
      })
      .addCase(deleteAvailableDate.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (arrow) => arrow.id !== action.meta.arg
        );
      }),
});

export default availableDatesSlice.reducer;
