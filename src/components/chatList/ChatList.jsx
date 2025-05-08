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
  getDoc,
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

            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
          });
          // setChats(docSnap.data());
        }
        // else {
        //   setChats([]);
        // }
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
