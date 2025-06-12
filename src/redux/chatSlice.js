// import { createSlice } from "@reduxjs/toolkit";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import { doc, fireDB, getDoc } from "../firebase/FirebaseConfig";

// // 🔄 Async thunk to fetch user info
// // export const fatchUserInfo = createAsyncThunk(
// //   "currentUser/fatchUserInfo",
// //   async (userId) => {
// //     const docRef = doc(fireDB, "users", userId);
// //     const user = await getDoc(docRef);
// //     if (user.exists()) {
// //       return user.data(); // return data to be stored
// //     } else {
// //       throw new Error("No such document!");
// //     }
// //   }
// // );

// const initialState = {
//   chatId: null,
//   user: null,
//   isCurrentUserBlocked: false,
//   isReceiverBlocked: false,
// };


//   const currentUser = useSelector((state) => state.currentUser.currentUser);
//   console.log(currentUser, "<<< Current User");


// export const chatSlice = createSlice({
//   name: "chatState",
//   initialState,
//   reducers: {
//     changeChat: (state, action) => {
//       // CHECK IF THE CORRENT USER IS BLOCKED
//       if (user.blocked.includes(currentUser.id)) {
//         state.chatId = action.payload.chatId;
//         state.user = null;
//         state.isCurrentUserBlocked = true;
//         state.isReceiverBlocked = false;
//       }
//       // CHECK IF THE RECEIVER USER IS BLOCKED
//       if (currentUser.blocked.includes(user.id)) {
//         state.chatId = action.payload.chatId;
//         state.user = state.user;
//         state.isCurrentUserBlocked = false;
//         state.isReceiverBlocked = true;
//       }
//     },
//     changeBlock: (state, action) => {
//       return {
//         ...state,
//         isReceiverBlocked: !state.isReceiverBlocked,
//       };
//     },
//   },
// });

// export const { changeChat, changeBlock } = chatSlice.actions;

// export default chatSlice.reducer;
