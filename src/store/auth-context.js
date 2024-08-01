import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggenIn: false,
  login: (token) => {},
  signup: () => {},
});

export const AuthProvider = (props) => {
  const [token, setToken] = useState(null);

  const isUserLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };
  const signupHandler = () => {
    setToken(null);
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
