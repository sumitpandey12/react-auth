import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);

  const formHandler = (e) => {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA6aaGYsVfpXPEFYP2d861ByRsOJcEZmeY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          //failed or error
          return res.json().then((data) => {
            let errorMsg = "Authentication Failed!";
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message;
            }
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        alert("Password Changes Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <form onSubmit={formHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
