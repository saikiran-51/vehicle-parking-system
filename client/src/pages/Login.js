import { Redirect } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (event) => {
    event.preventDefault();

    const userDetails = {
      username,
      password,
      errorMsg,
      isLoading: true,
    };

    try {
      const response = await axios.post(
        "https://parknova.onrender.com/login",
        userDetails,
      );

      localStorage.setItem("jwt_token", response.data.jwtToken);
      window.location.href = "/";
      toast.success("Login successful!");
    } catch (error) {
      setErrorMsg(error.response.data);
      setIsLoading(false);
      toast.error("error.response.data");
    }
  };

  const token = localStorage.getItem("jwt_token");

  if (token !== null) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Admin Login</h1>

      <form onSubmit={loginUser} className="login-form">
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit" className="login-btn">
          {isLoading ? "Loading..." : "Login"}
        </button>
        <p className="error-msg">{errorMsg}</p>
      </form>
    </div>
  );
};

export default Login;
