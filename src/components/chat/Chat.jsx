import "./chat.css";
import { useEffect, useRef, useState } from "react";
import Avatar from "../../assets/avatar.png";
import Phone from "../../assets/phone.png";
import Video from "../../assets/video.png";
import Info from "../../assets/info.png";
import Emoji from "../../assets/emoji.png";
import Image from "../../assets/img.png";
import Camera from "../../assets/camera.png";
import MicroPhone from "../../assets/mic.png";
import EmojiPicker from "emoji-picker-react";
import { doc, fireDB, onSnapshot } from "../../firebase/FirebaseConfig";
import { useSelector } from "react-redux";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);

   const chatStore = useSelector((state) => state.chatSlice);
   console.log(chatStore, "<< <<< chat Store")

  /// last chat view
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(fireDB, "chats", chatId),
      (res) => {
        setChat(res.data());
      }
    );
    return () => {
      unSub();
    };
  }, []);
  console.log(chat, "<<< chats from chats jawaad")

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
      <div className="center">
        <div className="message">
          <img src={Avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              veniam, iusto repudiandae facere omnis amet nisi consequuntur eum
              laboriosam earum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img
              src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              veniam, iusto repudiandae facere omnis amet nisi consequuntur eum
              laboriosam earum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={Avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              veniam, iusto repudiandae facere omnis amet nisi consequuntur eum
              laboriosam earum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              veniam, iusto repudiandae facere omnis amet nisi consequuntur eum
              laboriosam earum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={Avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              veniam, iusto repudiandae facere omnis amet nisi consequuntur eum
              laboriosam earum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              veniam, iusto repudiandae facere omnis amet nisi consequuntur eum
              laboriosam earum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
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
