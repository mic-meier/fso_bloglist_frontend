import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/reducers/loggedInUserReducer";
import { setNotification } from "../redux/reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(signIn(username, password));
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification("Incorrect credentials", "error", 2);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
