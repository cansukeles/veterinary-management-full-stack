import { configureStore } from "@reduxjs/toolkit";

import animalsSlice from "./animalsSlice";
import doctorsSlice from "./doctorsSlice";
import appointmentsSlice from "./appointmentsSlice";
import availableDatesSlice from "./availableDatesSlice";
import reportsSlice from "./reportsSlice";
import vaccinesSlice from "./vaccinesSlice";
import customersSlice from "./customersSlice";

export const store = configureStore({
  reducer: {
    animals: animalsSlice,
    doctors: doctorsSlice,
    appointments: appointmentsSlice,
    availableDates: availableDatesSlice,
    reports: reportsSlice,
    vaccines: vaccinesSlice,
    customers: customersSlice,
  },
});
