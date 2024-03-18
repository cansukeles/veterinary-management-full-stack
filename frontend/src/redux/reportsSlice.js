import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../utils/axios-config";

// get all reports
export const fetchReports = createAsyncThunk("reports/getReports", async () => {
  const res = await axiosInstance.get("/reports");
  return res.data;
});

// create new report
export const createReport = createAsyncThunk(
  "reports/createReport",
  async (requestBody) => {
    const response = await axiosInstance.post("/reports", requestBody);
    return response.data;
  }
);

// update a report
export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async (requestBody) => {
    const response = await axiosInstance.put("/reports", requestBody);
    return response.data;
  }
);

// delete a report
export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (id) => {
    const response = await axiosInstance.delete(`/reports/${id}`);
    return response.data;
  }
);

export const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        console.log("action", action);
        // state.items.push(action.payload);
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        // state.items.push(action.payload);
        let tempArr = [...state.items];
        const itemIndex = tempArr.findIndex((p) => p.id === action.payload.id);
        tempArr[itemIndex] = action.payload;
        state.items = tempArr;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (arrow) => arrow.id !== action.meta.arg
        );
      }),
});

export default reportsSlice.reducer;
