import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import "./App.css";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "./firebase/FirebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { fatchUserInfo } from "./redux/userSlice";

function App() {
  const [user, setUser] = useState();
  // const user = false;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.currentUser.currentUser);


  const userInfoFunc = (id) => {
    try {
      const userInfo = dispatch(fatchUserInfo(id));
      setUser(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      userInfoFunc(user.uid);
    });

    return () => {
      unsub();
    };
  }, [fatchUserInfo]);

  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
      <Notification />
    </div>
  );
}

export default App;
