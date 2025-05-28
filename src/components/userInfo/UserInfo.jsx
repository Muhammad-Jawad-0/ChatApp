import "./userInfo.css";
import More from "../../assets/more.png";
import Video from "../../assets/video.png";
import Edit from "../../assets/edit.png";
import Avatar from "../../assets/avatar.png";
import { useSelector, useDispatch } from "react-redux";

const UserInfo = () => {
  const userInfo = useSelector((state) => state.currentUser.currentUser);

  const dispatch = useDispatch();
  return (
    <div className="userInfo ">
      <div className="user">
        <img src={userInfo?.avatar || Avatar} alt="" />
        <h2>{userInfo?.username || "loading..."}</h2>
      </div>
      <div className="icons">
        <img src={More} alt="" />
        <img src={Video} alt="" />
        <img src={Edit} alt="" />
      </div>
    </div>
  );
};
export default UserInfo;
