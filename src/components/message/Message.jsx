import { useContext } from "react";
import MyContext from "../../context/MyContext";

const Message = ({ value, index }) => {
  const { user } = useContext(MyContext);
  return (
    <div
      key={index}
      className={`flex flex-col rounded-3xl p-2 max-w-80  
    ${
      user == value.user
        ? "bg-white self-end rounded-br-sm"
        : "bg-blue-300 rounded-bl-sm"
    }`}
    >
      <p className={`text-xs ${user == value.user && " self-end"}`}>~{value.user}</p>
      <p>{value.text}</p>
    </div>
  );
};

export default Message;
