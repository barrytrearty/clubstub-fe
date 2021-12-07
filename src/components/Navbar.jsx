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

const Navbar1 = () => {
  return (
    <Navbar collapseOnSelect expand="md" id="club-nav">
      <Container fluid>
        <Link to="/home">
          <Navbar.Brand className="logo-font">
            {" "}
            <div className="bold-hover">ClubStub</div>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/county/id">
              <Nav.Item className="green-bg">
                <div className="bold-hover">COUNTIES</div>
              </Nav.Item>
            </Link>
            <Link to="/club/id">
              <Nav.Item className="green-bg">
                <div className="bold-hover">CLUBS</div>
              </Nav.Item>
            </Link>
            <Link to="/matchess/id">
              <Nav.Item className="green-bg">
                <div className="bold-hover">MATCHES</div>
              </Nav.Item>
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Link to="/login">
              <Nav.Item className="green-bg">
                <div className="bold-hover">SIGN UP</div>
              </Nav.Item>
            </Link>
            <Link to="/login">
              <Nav.Item className="green-bg">
                <div className="bold-hover">LOGIN</div>
              </Nav.Item>
            </Link>
            {/* <Link to="/club/id">
              <Nav.Item className="m-2">
                <span className="green-bg">Clubs</span>
              </Nav.Item>
            </Link>
            <Link to="/matchess/id">
              <Nav.Item className="m-2">
            
                <span className="green-bg">Matches</span>
              </Nav.Item>
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Link to="/login">
              <Nav.Item className="m-2">
           
                <span className="green-bg">Sign Up</span>
              </Nav.Item>
            </Link>
            <Link to="/login">
              <Nav.Item className="m-2">
                
                <span className="green-bg">Login</span>
              </Nav.Item>
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
