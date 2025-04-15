import React, { useState } from "react";
import MyContext from "./MyContext";

const MyState = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login User Function

  const LoginUserFunction = async () => {
    setUser(true);
    try {
      console.log("Login Hugya")
    } catch (error) {
      setUser(false);
    }
  };

  const contextObj = {
    user,
    setUser,
    LoginUserFunction,
  };

  return <MyContext.Provider value={contextObj}>{children}</MyContext.Provider>;
};

export default MyState;
