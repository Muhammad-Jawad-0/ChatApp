import "./chat.css";
import { useState } from "react";
import Avatar from "../../assets/avatar.png";
import Phone from "../../assets/phone.png";
import Video from "../../assets/video.png";
import Info from "../../assets/info.png";
import Emoji from "../../assets/emoji.png";
import Image from "../../assets/img.png";
import Camera from "../../assets/camera.png";
import MicroPhone from "../../assets/mic.png";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  console.log(text);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={Avatar} alt="" />
          <div className="text">
            <span>Muhammad Jawad</span>
            <p>Lorem ipsum, dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src={Phone} alt="" />
          <img src={Video} alt="" />
          <img src={Info} alt="" />
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom">
        <div className="icons">
          <img src={Image} alt="" />
          <img src={Camera} alt="" />
          <img src={MicroPhone} alt="" />
        </div>
        <input
          value={text}
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src={Emoji} alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
