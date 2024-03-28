import { createSlice } from "@reduxjs/toolkit";
import { startTransition } from "react";

const initialState = {
  paymentStatus: null,
  error: null,
  loading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentStart: (state) => {
      state.loading = true;
    },
    paymentSuccess: (state, action) => {
      state.paymentStatus = action.payload;
      state.loading = false;
      state.error = null;
    },

    paymentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    paymentReset: (state) => {
      state.paymentStatus = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { paymentStart, payementFailure, paymentSuccess, paymentReset } =
  paymentSlice.actions;

export default paymentSlice.reducer;
