import "../App.css";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  FormControl,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut } from "../redux/actions/actions";
import { withRouter } from "react-router";

const Navbar1 = ({ history, location, match }) => {
  const userName = useSelector((state) => state.userInfo.username);
  const dispatch = useDispatch();

  const checkLoginOrSignupPage = window.location.pathname;
  console.log(checkLoginOrSignupPage);

  const logOut = () => {
    dispatch(logUserOut());
    history.push("/home");
  };

  return (
    <Navbar collapseOnSelect id="club-nav" expand="sm">
      <Container fluid>
        <Link to="/home">
          <Navbar.Brand className="logo-font">
            {" "}
            <div className="bold-hover">ClubStub</div>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {checkLoginOrSignupPage === "/login" ? (
            ""
          ) : checkLoginOrSignupPage === "/signup" ? (
            ""
          ) : (
            <Nav className="me-auto">
              <Link to="/competitions">
                <Nav.Item className="green-bg">
                  <div className="bold-hover">COMPETITIONS</div>
                </Nav.Item>
              </Link>

              <Link to="/orders">
                <Nav.Item className="green-bg">
                  <div className="bold-hover">MATCHES</div>
                </Nav.Item>
              </Link>
            </Nav>
          )}

          {userName ? (
            <Nav className="ml-auto">
              <Link to="/me">
                <Nav.Item className="green-bg">
                  <div className="bold-hover">{userName}</div>
                </Nav.Item>
              </Link>
              <Nav.Item className="green-bg">
                <div className="bold-hover" onClick={logOut}>
                  LOGOUT
                </div>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Link to="/signup">
                <Nav.Item className="green-bg">
                  <div className="bold-hover">SIGN UP</div>
                </Nav.Item>
              </Link>
              <Link to="/login">
                <Nav.Item className="green-bg">
                  <div className="bold-hover">LOGIN</div>
                </Nav.Item>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(Navbar1);
