// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(""); 
  const [userId, setUserId] = useState(""); // Add userId state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUsername(user.firstName);
      setRole(user.role);
      setUserId(user.id); // Store the user's ID
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUsername(userData.firstName);
    setRole(userData.role);
    setUserId(userData.id);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    setRole(""); 
    setUserId(""); // Reset userId on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
