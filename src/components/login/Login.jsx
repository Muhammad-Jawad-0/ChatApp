import { useState } from "react";
import "./login.css";
import Avatar from "../../assets/avatar.png";
import { toast } from "react-toastify";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        ...avatar,
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Enter Your  email" />
          <input
            type="password"
            name="password"
            placeholder="Enter Your password"
          />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator h-[80%] w-0.5 border-1 border-[#dddddd35]"></div>
      <div className="item">
        <h2>Create An Account,</h2>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Enter Your Full Name"
          />
          <input type="email" name="email" placeholder="Enter Your email" />
          <input
            type="password"
            name="password"
            placeholder="Enter Your password"
          />
          <label htmlFor="file">
            <img src={avatar.url || Avatar} alt="" />
            Upload an Image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />

          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
