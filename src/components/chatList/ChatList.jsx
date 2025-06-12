import "./chatList.css";
import SearchBar from "../../assets/search.png";
import Plus from "../../assets/plus.png";
import Minus from "../../assets/minus.png";
import Avatar from "../../assets/avatar.png";
import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { useSelector } from "react-redux";
// import { changeChat, changeBlock } from "../../redux/chatSlice";
import {
  collection,
  doc,
  fireDB,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "../../firebase/FirebaseConfig";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [inputs, setInputs] = useState("");

  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();

  // const userInfo = useSelector((state) => state.currentUser.currentUser);
  // const chatStore = useSelector((state) => state.chatSlice.currentUser);

  // const getAllUsers = () => {
  // const q = query(collection(fireDB, "userchats"), where("state", "==", "CA"));
  // const data = onSnapshot(q, (querySnapshot) => {
  //   const users = [];
  //   querySnapshot.forEach((doc) => {
  //     users.push(doc.data());
  //   });
  // });
  // };

  useEffect(() => {
    if (!currentUser?.id) return;

    const unSub = onSnapshot(
      doc(fireDB, "userchats", currentUser?.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(fireDB, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const user = userDocSnap.data();

            return { ...item, user };
          }
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
      // async (res) => {
      //   if (res.exists()) {
      //     const items = res.data().chats;
      //     const promises = items.map(async (item) => {
      //       const userDocRef = doc(fireDB, "users", item.receiverId);
      //       const userDocSnap = await getDoc(userDocRef);

      //       if (userDocSnap.exists()) {
      //         const user = userDocSnap.data();

      //         return { ...item, user };
      //       }

      //       return null;
      //     });
      //     const chatData = (await Promise.all(promises)).filter(Boolean);
      //     console.log(chatData, "<<<< chatData");
      //     setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      //   }
      // }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;

      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(fireDB, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error, "<<< error");
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(inputs.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={SearchBar} alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInputs(e.target.value)}
          />
        </div>
        <img
          onClick={() => setAddMode(!addMode)}
          src={addMode ? Minus : Plus}
          alt=""
          className="add"
        />
      </div>

      {filteredChats.map((v) => (
        <div
          className="item"
          key={v?.chatId}
          onClick={() => handleSelect(v)}
          style={{ backgroundColor: v?.isSeen ? "transparent" : "#5183fe" }}
        >
          <img
            src={
              v?.user?.blocked.includes(currentUser.id)
                ? Avatar
                : v?.user?.avatar || Avatar
            }
            alt=""
          />
          <div className="text">
            <span>
              {v?.user?.blocked.includes(currentUser.id)
                ? "User"
                : v?.user?.username}
            </span>
            <p>{v?.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;

// const userChatsRef = doc(fireDB, "userchats", currentUser.id);
// const userChatsSnapshot = await getDoc(userChatsRef);

// if (userChatsSnapshot.exists()) {
//   const userChatsData = userChatsSnapshot.data();

//   const chatIndex = userChatsData.chats.findIndex(
//     (c) => c.chatId === chatId
//   );

//   userChatsData.chats[chatIndex].isSeen = true

//   await updateDoc(userChatsRef, {
//     chats: userChatsData.chats,
//   });
// }
