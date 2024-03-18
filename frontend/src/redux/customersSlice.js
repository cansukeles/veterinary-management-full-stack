import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../utils/axios-config";

// get all customers
export const fetchCustomers = createAsyncThunk(
  "customers/getCustomers",
  async () => {
    const res = await axiosInstance.get("/customers");
    return res.data;
  }
);

// get all customers by name filtering
export const fetchCustomersByName = createAsyncThunk(
  "customers/getCustomersByName",
  async (name) => {
    const res = await axiosInstance.get(`/customers?nameLike=${name}`);
    return res.data;
  }
);

// create new customer
export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (requestBody) => {
    const response = await axiosInstance.post("/customers", requestBody);
    return response.data;
  }
);

// update new customer
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async (requestBody) => {
    const response = await axiosInstance.put("/customers", requestBody);
    return response.data;
  }
);

// delete new customer
export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id) => {
    const response = await axiosInstance.delete(`/customers/${id}`);
    return response.data;
  }
);

export const customersSlice = createSlice({
  name: "customers",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchCustomersByName.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.items.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        // state.items.push(action.payload);
        let tempArr = [...state.items];
        const itemIndex = tempArr.findIndex((p) => p.id === action.payload.id);
        tempArr[itemIndex] = action.payload;
        state.items = tempArr;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (arrow) => arrow.id !== action.meta.arg
        );
      }),
});

export default customersSlice.reducer;
