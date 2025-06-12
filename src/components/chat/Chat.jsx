import "./chat.css";
import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../../assets/avatar.png";
import Phone from "../../assets/phone.png";
import Video from "../../assets/video.png";
import Info from "../../assets/info.png";
import Emoji from "../../assets/emoji.png";
import Image from "../../assets/img.png";
import Camera from "../../assets/camera.png";
import MicroPhone from "../../assets/mic.png";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  fireDB,
  getDoc,
  onSnapshot,
  updateDoc,
} from "../../firebase/FirebaseConfig";
// import { useSelector } from "react-redux";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";
import MyContext from "../../context/MyContext";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const context = useContext(MyContext);
  const { setImageProgress } = context;
  const endRef = useRef(null);

  // const chatStore = useSelector((state) => state.chatSlice);
  // console.log(chatStore, "<< <<< chat Store");

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const userIDs = [currentUser?.id, user?.id];

  /// last chat view
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(fireDB, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        ...img,
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file, setImageProgress);
      }

      await updateDoc(doc(fireDB, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(fireDB, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    setImg({
      file: null,
      url: "",
    });

    setText("");
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || Avatar} alt="" />
          <div className="text">
            <span>{user?.username}</span>
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
        {/* <div className="message">
          <img src={Avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              veniam, iusto repudiandae facere omnis amet nisi consequuntur eum
              laboriosam earum.
            </p>
            <span>1 min ago</span>
          </div>
        </div> */}
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? "message own" : "message"
            }
            key={message?.createAt}
          >
            <div className="texts">
              {message?.img && <img src={message?.img} alt="" />}
              <p>{message?.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src={Image} alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => handleImg(e)}
          />
          <img src={Camera} alt="" />
          <img src={MicroPhone} alt="" />
        </div>
        <input
          value={text}
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You Can't send a message"
              : "Type a message..."
          }
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img src={Emoji} alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          {isCurrentUserBlocked || isReceiverBlocked ? "Disable":"Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
