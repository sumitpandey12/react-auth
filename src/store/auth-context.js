import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggenIn: false,
  login: (token) => {},
  signup: () => {},
});

export const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [timeoutId, setTimeoutId] = useState(null);

  const isUserLoggedIn = !!token;

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    resetLogoutTimer();
  };
  const signupHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const startLogoutTimer = () => {
    const id = setTimeout(() => {
      signupHandler();
    }, 5 * 60 * 1000);
    setTimeoutId(id);
  };
  const resetLogoutTimer = () => {
    clearTimeout(timeoutId);
    startLogoutTimer();
  };

  const contextValue = {
    token: token,
    isLoggenIn: isUserLoggedIn,
    login: loginHandler,
    signup: signupHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
