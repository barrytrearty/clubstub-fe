import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut } from "../../redux/actions/actions";
import { withRouter } from "react-router";
import { useEffect, useRef } from "react";
import logo from "../../data/county-crests/ballOdeals.png";

const Navbar1 = ({ history, location, match }) => {
  const userName = useSelector((state) => state.userInfo.username);
  const picture = useSelector((state) => state.userInfo.picture);
  const dispatch = useDispatch();
  // const scrollHeight = window.scrollY

  const checkLoginOrSignupPage = window.location.pathname;
  console.log(checkLoginOrSignupPage);

  const logOut = () => {
    dispatch(logUserOut());
    history.push("/home");
  };

  const clubNavContainer = useRef();

  useEffect(() => {
    clubNavContainer.current.style.opacity = 1;
    // document.getElementById("club-nav-container").style.opacity = 1;
  }, []);

  // useEffect(() => {
  //   if(scrollHeight > );
  // }, []);

  return (
    <div id="club-nav-container" ref={clubNavContainer} className="top-nav">
      <Navbar
        collapseOnSelect
        id="club-nav"
        expand="sm"
        className="navbar-dark"
      >
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
              <Nav.Item className="single-links">
                <div className="bold-hover">TEAMS</div>
              </Nav.Item>
            </Link>

            <Link to="/matches">
              <Nav.Item className="single-links">
                <div className="bold-hover">MATCHES</div>
              </Nav.Item>
            </Link>
          </Nav>
          {/* )} */}

          {userName ? (
            // <Nav className="ml-auto">
            <Nav className="navbarCont">
              <div className="single-links disappearSM">|</div>
              <Link to="/me" className="disappearSM">
                <Nav.Item className="single-links userNav">
                  <img src={picture} alt="" />
                </Nav.Item>
              </Link>
              <Link to="/me">
                <Nav.Item className="single-links userNav">
                  <div className="bold-hover">{userName}</div>
                </Nav.Item>
              </Link>
              <Nav.Item className="single-links">
                <div className="bold-hover" onClick={logOut}>
                  LOGOUT
                </div>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="navbarCont">
              <div className="single-links disappearSM">|</div>
              <Link to="/signup">
                <Nav.Item className="single-links">
                  <div className="bold-hover">SIGN UP</div>
                </Nav.Item>
              </Link>
              <Link to="/login">
                <Nav.Item className="single-links">
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
