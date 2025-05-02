import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
