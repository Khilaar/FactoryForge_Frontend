import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slices/counterSlice";

const store = configureStore({
  reducer: {
    count: counterReducer,
  },
});

export { store };
