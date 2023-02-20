import React, { useState, useEffect, createContext } from "react";
import { isAuthenticated } from "../../services/AuthService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    token: "",
    profile: {},
    authenticated: false,
    expires_at: "",
    allowsLocation: false,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = isAuthenticated();
      if (cuser === null) {
        console.log("not authenticated");
        localStorage.setItem("user", "");
        cuser = {};
      }

      setCurrentUser(cuser);
    };

    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
