import Avatar from "../../../assets/avatar.png";
import "./addUser.css";
import {
  arrayUnion,
  collection,
  doc,
  fireDB,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "../../../firebase/FirebaseConfig";
import { useState } from "react";
import {useUserStore} from "../../../lib/userStore"
// import { useSelector } from "react-redux";

const AddUser = () => {
  // const userInfo = useSelector((state) => state.currentUser.currentUser);
   const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const [user, setUser] = useState(null);


  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(fireDB, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(fireDB, "chats");
    const userChatsRef = collection(fireDB, "userchats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser?.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user?.id,
          updatedAt: Date.now(),
        }),
      });

      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="username"
          name="username"
          style={{ color: "#000" }}
        />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || Avatar} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={() => handleAdd()}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
