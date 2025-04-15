import React, { useState } from "react";
import MyContext from "./MyContext";

const MyState = ({ children }) => {
  const [user, setUser] = useState(null);

  const contextObj = {
    user,
    setUser,
  };

  return <MyContext.Provider value={contextObj}>{children}</MyContext.Provider>;
};

export default MyState;
