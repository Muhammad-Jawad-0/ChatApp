import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import "./App.css";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "./firebase/FirebaseConfig";
// import { useSelector, useDispatch } from "react-redux";
// import { fatchUserInfo } from "./redux/userSlice";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

function App() {
  // const [user, setUser] = useState();
  // const user = false;
  // const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.currentUser.currentUser);
  // const userInfoFunc = (id) => {
  //   try {
  //     const userInfo = dispatch(fatchUserInfo(id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser, "<<<< current User");

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
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
