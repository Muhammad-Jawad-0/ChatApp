import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import "./App.css";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

function App() {
  const user = true;
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
