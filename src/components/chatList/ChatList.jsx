import "./chatList.css";
import SearchBar from "../../assets/search.png";
import Plus from "../../assets/plus.png";
import Minus from "../../assets/minus.png";
import Avatar from "../../assets/avatar.png";
import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { useSelector } from "react-redux";
import { changeChat, changeBlock } from "../../redux/chatSlice";
import {
  collection,
  doc,
  fireDB,
  getDoc,
  onSnapshot,
  query,
} from "../../firebase/FirebaseConfig";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const userInfo = useSelector((state) => state.currentUser.currentUser);
  // const chatStore = useSelector((state) => state.chatSlice.currentUser);

  console.log(userInfo, "<< userInfo");
  console.log(chats, "<< chats");

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
    if (!userInfo?.id) return;

    const unSub = onSnapshot(
      doc(fireDB, "userchats", userInfo?.id),
      async (res) => {
        if (res.exists()) {
          const items = res.data().chats;
          const promises = items.map(async (item) => {
            const userDocRef = doc(fireDB, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const user = userDocSnap.data();

              return { ...item, user };
            }

            return null;
          });
          const chatData = (await Promise.all(promises)).filter(Boolean);
          console.log(chatData, "<<<< chatData");
          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      }
    );

    return () => {
      unSub();
    };
  }, [userInfo?.id]);

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={SearchBar} alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          onClick={() => setAddMode(!addMode)}
          src={addMode ? Minus : Plus}
          alt=""
          className="add"
        />
      </div>

      {chats.map((v) => (
        <div className="item" key={v.chatId} onClick={() => handleSelect(v)}>
          <img src={v.user.avatar || Avatar} alt="" />
          <div className="text">
            <span>{v.user.username}</span>
            <p>{v.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
