import { useState } from "react";
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
import { setUserInfo } from "../redux/actions/actions.js";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
// import bgImage from "../data/bg.PNG";

//const user = useSelector((state) => state.userInfo);

// Const dispatch= useDispatch()
// dispatch(setuserinfo(fetchedPerson))
// { user:”userinfo”, accessToken:”token” }
// Const history= useHistory()
// History.push(‘/main/userID”)

//   onClick={this.handleSubmit}

const Login = ({ history }) => {
  // const user = useSelector((state) => state.userInfo)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = async () => {
    const obj = { email, password };
    try {
      let response = await fetch(`http://localhost:5000/users/login`, {
        method: "POST",
        body: JSON.stringify(obj),
        // body: obj,
        // credentials: "include",
        // withCredentials: true,
        headers: { "Content-Type": "application/json" },
        // Set-Cookie: true
      });
      console.log(obj);
      // console.log(response);
      // console.log(response.headers.get("set-cookie"));

      // console.log(JSON.stringify(obj));
      console.log(response);
      let tokenObj = await response.json();
      console.log(tokenObj);
      if (response.ok) {
        // dispatch(setUserInfo(data.user));
        // dispatch(setChats(data.user.chats));
        localStorage.setItem("accessToken", tokenObj.tokens.accessToken);
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

    // console.log("hello world");
    // const userObject = { username, password };
    // dispatch(setUserInfo(userObject));
    // console.log(userObject);
  };

  return (
    <Container className="login">
      <Row>
        <Col
          xs="12"
          className="mx-auto text-dark p-5 d-flex flex-column justify-content-center align-items-center"
        >
          <Card className="p-3">
            <h1 className="font-weight-bold">Log in to ClubStub</h1>
            <div className="text-muted">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
            <InputGroup className="my-3 d-flex flex-column justify-content-center align-items-center w-100">
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
                className="w-100"
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button onClick={handleSubmit} variant="success">
              Log in
            </Button>
            {/* <a href={`http://localhost:5000/users/googleLogin`}> */}
            <Button variant="dark mt-3">
              <FcGoogle /> Log in with Google
            </Button>
            <Button variant="primary mt-1">
              <BsFacebook /> Log in with Facebook
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
