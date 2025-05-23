import React, { useContext, useEffect, useRef, useState } from "react";
import { dummyData } from "../../utils/dummyData";
import Message from "../../components/message/Message";
import MyContext from "../../context/MyContext";

const HomePage = () => {
  const { logout, user } = useContext(MyContext);
  const [message, setMessage] = useState(null);
  const [text, setText] = useState("");
  const lastMsg = useRef(null);
  const fetchMessageFunction = async () => {
    try {
      const data = dummyData;
      setMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = (msg) => {
    setMessage((pre) => [...pre, msg]);
  };

  const handleSend = () => {
    const msg = {
      text,
      user,
    };

    sendMessage(msg);
    setText("");
  };
  useEffect(() => {
    fetchMessageFunction();
  }, []);
  useEffect(() => {
    if (lastMsg) {
      lastMsg.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const renderMessages = () => {
    return (
      <>
        {message?.map((v, i) => {
          return <Message value={v} index={i} />;
        })}
      </>
    );
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-blue-100 p-4 rounded-lg shadow-2xl w-1/3 flex flex-col items-center justify-between gap-3">
        <nav className="bg-white p-2 rounded-md shadow-sm flex items-center w-full justify-between">
          <h1 className="font-bold tracking-wider">ChatApp</h1>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer active:scale-95 transition-all duration-75"
            onClick={() => logout()}
          >
            Logout
          </button>
        </nav>
        <div className=" w-full h-[70vh] flex flex-col gap-2 items-start overflow-auto px-2 ">
          {renderMessages()}
          <div ref={lastMsg}></div>
        </div>

        <div className="input-area flex gap-2 w-full">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Enter Your Text"
            className="w-full p-2 rounded-md shadow-md "
          />
          <button
            onClick={handleSend}
            className="bg-blue-700 text-white px-4 py-1 rounded-lg shadow-lg hover:bg-red-500 cursor-pointer active:scale-95 transition-all duration-75"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
