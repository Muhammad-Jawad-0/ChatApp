// import { createSlice } from "@reduxjs/toolkit";
// import { doc, fireDB, getDoc } from "../firebase/FirebaseConfig";

// const initialState = {
//   currentUser: null,
//   isLoading: true,
// };

// export const userSlice = createSlice({
//   name: "currentUser",
//   initialState,
//   reducers: {
//     fatchUserInfo:  (state, actions) => {
//       if (actions.payload) {
//         try {
//           const docRef = doc(fireDB, "users", actions.payload);
//           const user =  getDoc(docRef);

//           if (user.exists()) {
//             state.currentUser = user.data();
//             state.isLoading = false;
//             console.log("Document data:", user.data());
//           } else {
//             state.currentUser = null;
//             state.isLoading = false;
//             console.log("No such document!");
//           }
//         } catch (error) {
//           console.log(error);
//           state.currentUser = null;
//           state.isLoading = false;
//         }
//       } else {
//         state.currentUser = null;
//         state.isLoading = false;
//       }
//     },
//   },
// });

// export const { fatchUserInfo } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, fireDB, getDoc } from "../firebase/FirebaseConfig";

// 🔄 Async thunk to fetch user info
export const fatchUserInfo = createAsyncThunk(
  "currentUser/fatchUserInfo",
  async (userId) => {
    const docRef = doc(fireDB, "users", userId);
    const user = await getDoc(docRef);
    if (user.exists()) {
      return user.data(); // return data to be stored
    } else {
      throw new Error("No such document!");
    }
  }
);

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {  },
  extraReducers: (builder) => {
    builder
      .addCase(fatchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fatchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(fatchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export const { fatchUserInfo } = userSlice.actions;

export default userSlice.reducer;
