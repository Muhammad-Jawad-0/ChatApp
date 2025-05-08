import Avatar from "../../../assets/avatar.png";
import "./addUser.css";
import {
  collection,
  fireDB,
  getDocs,
  query,
  where,
} from "../../../firebase/FirebaseConfig";
import { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(fireDB, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="username"
          name="username"
          style={{ color: "#000" }}
        />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || Avatar} alt="" />
            <span>{user.username}</span>
          </div>
          <button>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
