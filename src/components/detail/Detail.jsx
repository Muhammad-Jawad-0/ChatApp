import "./detail.css";
import Avatar from "../../assets/avatar.png";
import ArrowUp from "../../assets/arrowup.png";
import ArrowDown from "../../assets/arrowDown.png";
import Download from "../../assets/download.png";
import {
  auth,
  doc,
  fireDB,
  updateDoc,
  arrayUnion,
} from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove } from "firebase/firestore";

const Detail = () => {
  const logoutFunc = () => {
    auth.signOut();
    toast.error("Logout Sucessfully");
  };

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();

  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(fireDB, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || Avatar} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="info ">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src={ArrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src={ArrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title ">
            <span>Share Photos</span>
            <img src={ArrowDown} alt="" />
          </div>
          <div className="photos ">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Share Files</span>
            <img src={ArrowUp} alt="" />
          </div>
        </div>

        <button onClick={() => handleBlock()}>
          {isCurrentUserBlocked
            ? "You Are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => logoutFunc()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
