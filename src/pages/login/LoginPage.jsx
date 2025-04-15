import React, { useContext } from "react";
import MyContext from "../../context/MyContext";

const LoginPage = () => {
  const { LoginUserFunction } = useContext(MyContext);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-blue-300 p-4 rounded-lg shadow-2xl w-80 aspect-square  justify-around items-center flex flex-col">
        <div className="title">
          <h1 className=" text-3xl font-bold">Login Page</h1>
          <p>Chat App</p>
        </div>
        <button onClick={() => LoginUserFunction()} className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md cursor-pointer hover:bg-red-600 active:scale-90 transition-all duration-200">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
