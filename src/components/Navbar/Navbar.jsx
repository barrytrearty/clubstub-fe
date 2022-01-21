import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut } from "../../redux/actions/actions";
import { withRouter } from "react-router";
import { useEffect } from "react";
import logo from "../../data/county-crests/ballOdeals.png";

const Navbar1 = ({ history, location, match }) => {
  const userName = useSelector((state) => state.userInfo.username);
  const isAdmin = useSelector((state) => state.userInfo.role);
  const dispatch = useDispatch();

  const checkLoginOrSignupPage = window.location.pathname;
  console.log(checkLoginOrSignupPage);

  const logOut = () => {
    dispatch(logUserOut());
    history.push("/home");
  };

  useEffect(() => {
    document.getElementById("club-nav-container").style.opacity = 1;
  }, []);

  return (
    <div id="club-nav-container" className="top-nav">
      <Navbar collapseOnSelect id="club-nav" expand="sm">
        {/* <Container fluid> */}
        <Link to="/home">
          <Navbar.Brand className="brandLogoOD">
            <img src={logo} className="logoOD" alt="" />
            {/* <div className="bold-hover">ClubStub</div> */}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {checkLoginOrSignupPage === "/login" ? (
            ""
          ) : checkLoginOrSignupPage === "/signup" ? (
            ""
          ) : (
            <Nav className="ml-auto">
              <Link to="/teams">
                <Nav.Item className="green-bg">
                  <div className="bold-hover">TEAMS</div>
                </Nav.Item>
              </Link>

              <Link to="/matches">
                <Nav.Item className="green-bg">
                  <div className="bold-hover">MATCHES</div>
                </Nav.Item>
              </Link>
            </Nav>
          )}
          {/* {isAdmin === "Admin" ? (
            <Link to="/manage">
              <Nav.Item className="green-bg">
                <div className="bold-hover">Manage</div>
              </Nav.Item>
            </Link>
          ) : (
            ""
          )} */}

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
        {/* </Container> */}
      </Navbar>
    </div>
  );
};

export default withRouter(Navbar1);
