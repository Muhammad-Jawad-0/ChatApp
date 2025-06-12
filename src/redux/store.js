import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./userSlice";
// import chatSliceReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    // chatSlice: chatSliceReducer,
  },
});
