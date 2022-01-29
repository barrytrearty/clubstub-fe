import { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/actions/actions.js";

const Signup = ({ history }) => {
  const [username, setUsername] = useState("");
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

  const signup = async () => {
    const obj = { email, password, username };
    try {
      let response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });
      // console.log(obj);
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
    signup();
  };

  return (
    <div>
      <div id="create-form">
        <form>
          <h2>Create an account</h2>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button onClick={handleSubmit}>Sign Up </button>
          <button>
            <FcGoogle /> Sign up with Google
          </button>
          <button>
            <BsFacebook /> Sign up with Facebook
          </button>

          <p className="alt-form">
            Already have an account? <Link to="/login">Login </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signup);
