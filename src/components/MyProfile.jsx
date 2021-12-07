import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Card,
  Spinner,
} from "react-bootstrap";

// import PeopleSection from "./PeopleSection";
import { Link, withRouter } from "react-router-dom";
import logo from "../data/logo.PNG";

const MyProfile = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://localhost:5000";

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      let response = await fetch(`${apiUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let userRes = await response.json();
      console.log(userRes);
      setUser(userRes);
      setLoading(false);
      console.log(user);
      return userRes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramToken = params.get("accessToken");

    if (paramToken) {
      localStorage.setItem("accessToken", paramToken);
    }
    getProfile();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container fluid className="profileTopCard topmargin px-0 mx-3">
          <Row>
            <Col xs={3}>
              {" "}
              <Card className="mt-5" style={{ borderRadius: "8px" }}>
                <img className="profileImage" src={user.picture} alt="" />
                <Card.Title className="mb-0 font-weight-bold">
                  {user.username}
                </Card.Title>
                <Card.Text className="mb-0">Donegal</Card.Text>
                <Card.Text className="mb-0">Followers</Card.Text>
                <Button
                  className="messagebutton px-3 py-1 mb-3"
                  variant="success"
                >
                  Message
                </Button>
              </Card>
            </Col>
            <Col xs={8}>
              <Card
                style={{
                  borderRadius: "8px",
                }}
                className="mt-5"
              >
                <Card.Body className="py-4">
                  <Card.Title class="sectionheader pb-3">
                    Upcoming Events
                  </Card.Title>
                  <Card.Text class="sectiontext mb-0">None to show</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* <Card
            style={{
              borderRadius: "8px",
            }}
            className="mb-3"
          >
            <Card.Body className="py-4">
              <Card.Title class="sectionheader pb-3">
                Carousel with Club/County Teams
              </Card.Title>
              <Card.Text class="sectiontext mb-0">None to show</Card.Text>
            </Card.Body>
          </Card> */}
        </Container>
      )}
    </div>
  );
};

export default MyProfile;
