import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import "./App.css";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase/FirebaseConfig";

function App() {
  const user = false;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  
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
