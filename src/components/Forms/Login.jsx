import { useState } from "react";
// import './Login.css'
import { Link, withRouter } from "react-router-dom";
// import { setUserInfo } from "../redux/actions/actions.js";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import "./forms.css";

import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/actions/actions.js";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiUrl = process.env.REACT_APP_BE;

  const dispatch = useDispatch();

  const getProfile = async (token) => {
    try {
      let response = await fetch(`${apiUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let userRes = await response.json();
      console.log(userRes);
      dispatch(setUserInfo(userRes));
      return userRes;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    const obj = { email, password };
    try {
      let response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });
      console.log(obj);

      console.log(response);
      let tokenObj = await response.json();
      console.log(tokenObj);
      let token = tokenObj.tokens.accessToken;
      if (response.ok) {
        localStorage.setItem("accessToken", token);
        getProfile(token);

        history.push(`/me`);
      } else {
        console.log("Not groovy");
      }
    } catch (error) {
      console.log("Not fergilicious");
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div id="create-form">
      <form>
        <h2>Log in</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Login </button>
        <button>
          <FcGoogle /> Log in with Google
        </button>
        <button>
          <BsFacebook /> Log in with Facebook
        </button>

        <p className="alt-form">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default withRouter(Login);
