import { create } from "zustand";
import { doc, fireDB, getDoc } from "../firebase/FirebaseConfig.jsx";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(fireDB, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else{
        set({ currentUser: null, isLoading: true });
      }
    } catch (error) {
      console.log(error, "<<<<< error");
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
