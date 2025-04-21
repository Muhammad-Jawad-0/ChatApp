import "./userInfo.css";
import More from "../../assets/more.png";
import Video from "../../assets/video.png";
import Edit from "../../assets/edit.png";
import Avatar from "../../assets/avatar.png";

const UserInfo = () => {
  return (
    <div className="userInfo ">
      <div className="user">
        <img src={Avatar} alt="" />
        <h2>Muhammad Jawad</h2>
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
