import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
// import './Login.css'
import { Link, withRouter } from "react-router-dom";
// import { setUserInfo } from "../redux/actions/actions.js";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import "./forms.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    const obj = { email, password };
    try {
      let response = await fetch(`http://localhost:5000/users/login`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });
      console.log(obj);

      console.log(response);
      let tokenObj = await response.json();
      console.log(tokenObj);
      if (response.ok) {
        localStorage.setItem("accessToken", tokenObj.tokens.accessToken);
        setLoggedIn(true);
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

  // useEffect(() => {
  //   dispatch(setUserInfo({ email: email, username: email }));
  // }, [loggedIn]);

  return (
    <div id="create-form">
      <form>
        {/* <h1>Welcome to O'Deals</h1> */}
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
          <FcGoogle /> Log in with Google{" "}
        </button>
        <button>
          {" "}
          <BsFacebook /> Log in with Facebook{" "}
        </button>
        {/* <input type="submit" value="Log in" /> */}
        <p className="alt-form">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default withRouter(Login);
