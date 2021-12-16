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

const Signup = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  const signup = async () => {
    const obj = { email, password, username };
    try {
      let response = await fetch(`http://localhost:5000/users/register`, {
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

  // useEffect(() => {
  //   dispatch(setUserInfo({ email: email, username: email }));
  // }, [loggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <Container className="login">
      <Row>
        <Col
          xs="12"
          className="mx-auto text-dark p-5 d-flex flex-column justify-content-center align-items-center"
        >
          <Card className="p-3">
            <h1 className="font-weight-bold">Sign up to ClubStub</h1>
            <div className="text-muted">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
            <InputGroup className="my-3 d-flex flex-column justify-content-center align-items-center w-100">
              <div className="text-muted">Username</div>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                className="w-100"
                // value="Paul@hotmail.com"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="text-muted">Email</div>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                className="w-100"
                // value="Paul@hotmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-muted mt-3">Password</div>
              <FormControl
                type="password"
                className="w-100"
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button onClick={handleSubmit} variant="success">
              Sign up
            </Button>

            <Button variant="dark mt-3">
              <FcGoogle /> Sign up with Google
            </Button>
            <Button variant="primary mt-1">
              <BsFacebook /> Sign up with Facebook
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Signup);
