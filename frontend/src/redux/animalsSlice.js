import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../utils/axios-config";

// get all animals
export const fetchAnimals = createAsyncThunk("animals/getAnimals", async () => {
  const res = await axiosInstance.get("/animals");
  return res.data;
});

// get all animals by name filtering
export const fetchAnimalsByName = createAsyncThunk(
  "animals/getAnimalsByName",
  async (name) => {
    const res = await axiosInstance.get(`/animals?nameLike=${name}`);
    return res.data;
  }
);

// get all animals by customer name filtering
export const fetchAnimalsByCustomerName = createAsyncThunk(
  "animals/getAnimalsByCustomerName",
  async (name) => {
    const res = await axiosInstance.get(
      `/animals/customer-name?customerNameLike=${name}`
    );
    return res.data;
  }
);

// create new animal
export const createAnimal = createAsyncThunk(
  "animals/createAnimal",
  async (requestBody) => {
    const response = await axiosInstance.post("/animals", requestBody);
    return response.data;
  }
);

// update an animal
export const updateAnimal = createAsyncThunk(
  "animals/updateAnimal",
  async (requestBody) => {
    const response = await axiosInstance.put("/animals", requestBody);
    return response.data;
  }
);

// delete an animal
export const deleteAnimal = createAsyncThunk(
  "animals/deleteAnimal",
  async (id) => {
    const response = await axiosInstance.delete(`/animals/${id}`);
    return response.data;
  }
);

export const animalsSlice = createSlice({
  name: "animals",
  initialState: {
    items: [],
    itemsByVaccineDates: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAnimalsByName.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAnimalsByCustomerName.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // .addCase(fetchAnimalsByVaccineDates.fulfilled, (state, action) => {
      //   state.itemsByVaccineDates = action.payload;
      // })
      .addCase(createAnimal.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.items.push(action.payload);
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        // state.items.push(action.payload);
        let tempArr = [...state.items];
        const itemIndex = tempArr.findIndex((p) => p.id === action.payload.id);
        tempArr[itemIndex] = action.payload;
        state.items = tempArr;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (arrow) => arrow.id !== action.meta.arg
        );
      }),
});

export default animalsSlice.reducer;
