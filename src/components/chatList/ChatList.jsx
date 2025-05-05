import "./chatList.css";
import SearchBar from "../../assets/search.png";
import Plus from "../../assets/plus.png";
import Minus from "../../assets/minus.png";
import Avatar from "../../assets/avatar.png";
import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { useSelector } from "react-redux";
import {
  collection,
  doc,
  fireDB,
  onSnapshot,
  query,
} from "../../firebase/FirebaseConfig";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const userInfo = useSelector((state) => state.currentUser.currentUser);

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
      doc(fireDB, "userchats", userInfo.id),
      async(res) => {
        if (res.exists()) {
          const items = res.data().chats
          // setChats(docSnap.data());
        } else {
          setChats([]);
        }
      }
    );

    return () => unSub();
  }, [userInfo?.id]);

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
      {chats.map((v, i) => (
        <div className="item" key={v.chatId}>
          <img src={v.avatar} alt="" />
          <div className="text">
            <span>{v.username}</span>
            <p>{chats.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
