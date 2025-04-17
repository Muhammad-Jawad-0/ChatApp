import React, { useState } from "react";
import MyContext from "./MyContext";

const MyState = ({ children }) => {
  const [user, setUser] = useState("You");

  // Login User Function

  const LoginUserFunction = async () => {
    setUser("You");
    try {
      console.log("Login Hugya");
    } catch (error) {
      setUser(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const contextObj = {
    user,
    setUser,
    LoginUserFunction,
    logout
  };

  return <MyContext.Provider value={contextObj}>{children}</MyContext.Provider>;
};

export default MyState;
