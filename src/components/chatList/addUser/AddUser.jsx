import Avatar from "../../../assets/avatar.png";
import "./addUser.css";

const AddUser = () => {
  return (
    <div className="addUser">
      <form>
        <input type="text" placeholder="username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src={Avatar} alt="" />
          <span>Muhammad Jawad</span>
        </div>
        <button>Add User</button>
      </div>

    </div>
  );
};

export default AddUser;
