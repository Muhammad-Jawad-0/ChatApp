import "./chatList.css";
import SearchBar from "../../assets/search.png";
import Plus from "../../assets/plus.png";
import Minus from "../../assets/minus.png";
import Avatar from "../../assets/avatar.png";
import { useState } from "react";
import AddUser from "./addUser/AddUser";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
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

      <div className="item">
        <img src={Avatar} alt="" />
        <div className="text">
          <span>Muhamamd Jawad</span>
          <p>Hi Kia haal ha?</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="text">
          <span>Muhamamd Jawad</span>
          <p>Hi Kia haal ha?</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="text">
          <span>Muhamamd Jawad</span>
          <p>Hi Kia haal ha?</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="text">
          <span>Muhamamd Jawad</span>
          <p>Hi Kia haal ha?</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="text">
          <span>Muhamamd Jawad</span>
          <p>Hi Kia haal ha?</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
