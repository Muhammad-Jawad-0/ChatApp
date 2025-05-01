import { useContext, useState } from "react";
import "./login.css";
import Avatar from "../../assets/avatar.png";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  setDoc,
  doc,
  fireDB,
} from "../../firebase/FirebaseConfig";
import upload from "../../lib/upload";
import MyContext from "../../context/MyContext";

const Login = () => {
  const context = useContext(MyContext);
  const { imageprogress, setImageProgress, loading, setLoading } = context;

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successfully")
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      avatar.url == ""
    ) {
      return toast.warn("All Feild Are Required");
    }

    try {
      const responese = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const imageUrl = await upload(avatar.file, setImageProgress);

      await setDoc(doc(fireDB, "users", responese.user.uid), {
        username,
        email,
        avatar: imageUrl,
        id: responese.user.uid,
        blocked: [],
      });

      await setDoc(doc(fireDB, "userchats", responese.user.uid), {
        chats: [],
      });

      toast.success("Account Create Successfully! You Can Login Now");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Enter Your  email" />
          <input
            type="password"
            name="password"
            placeholder="Enter Your password"
          />
          <button disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
      <div className="separator h-[80%] w-0.5 border-1 border-[#dddddd35]"></div>
      <div className="item">
        <h2>Create An Account</h2>
        <form onSubmit={handleRegister}>
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

          <button disabled={loading}>
            {imageprogress > 0 && imageprogress < 100 ? (
              <>
                <p>uploading : {Math.round(imageprogress)}%</p>
              </>
            ) : (
              <>
                <p>{loading ? "Loading..." : "Sign Up"}</p>
              </>
            )}
            {/* {(imageprogress > 0 && imageprogress < 100 && (
              <p>uploading : {Math.round(imageprogress)}%</p>
            )) || <>{"Sign Up"}</>} */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
