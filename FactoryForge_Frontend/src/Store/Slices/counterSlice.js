import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    addToCountByOne: (state) => {
      state.count++;
    },
  },
});

export const { addToCountByOne } = counterSlice.actions;

export default counterSlice.reducer;
