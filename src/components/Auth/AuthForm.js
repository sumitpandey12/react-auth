import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setIsLoading(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6aaGYsVfpXPEFYP2d861ByRsOJcEZmeY";
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6aaGYsVfpXPEFYP2d861ByRsOJcEZmeY`;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authentication Failed!";
            // if (data && data.error && data.error.message) {
            //   errorMsg = data.error.message;
            // }
            // alert(errorMsg);
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <div>Sending Request</div>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
