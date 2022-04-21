import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: {},
  reducers: {},
});

export default cart.reducer;

export const actions = cart.actions;
