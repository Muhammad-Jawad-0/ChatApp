import React, { useState } from "react";
import MyContext from "./MyContext";

const MyState = ({ children }) => {
  const [user, setUser] = useState("You");
  const [imageprogress, setImageProgress] = useState(0);

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
    logout,
    imageprogress,
    setImageProgress,
  };

  return <MyContext.Provider value={contextObj}>{children}</MyContext.Provider>;
};

export default MyState;
