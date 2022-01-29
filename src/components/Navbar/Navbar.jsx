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
  const picture = useSelector((state) => state.userInfo.picture);
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
        <Link to="/home">
          <Navbar.Brand className="brandLogoOD">
            <img src={logo} className="logoOD" alt="" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* {checkLoginOrSignupPage === "/login" ? (
            ""
          ) : checkLoginOrSignupPage === "/signup" ? (
            ""
          ) : ( */}
          <Nav id="teamNav" className="ml-auto navbarCont">
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
          {/* )} */}

          {userName ? (
            // <Nav className="ml-auto">
            <Nav className="navbarCont">
              <div className="green-bg disappearSM">|</div>
              <Link to="/me" className="disappearSM">
                <Nav.Item className="green-bg userNav">
                  <img src={picture} alt="" />
                </Nav.Item>
              </Link>
              <Link to="/me">
                <Nav.Item className="green-bg userNav">
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
            <Nav className="navbarCont">
              <div className="green-bg disappearSM">|</div>
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
