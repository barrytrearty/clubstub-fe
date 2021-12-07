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
  Image,
} from "react-bootstrap";

// import PeopleSection from "./PeopleSection";
import { Link, withRouter } from "react-router-dom";
import logo from "../data/logo.PNG";
import CarouselUser from "./CarouselUsers";

const Club = ({ match }) => {
  const { id } = match.params;

  const apiUrl = "http://localhost:5000";
  const [club, setClub] = useState();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  const getClub = async (id) => {
    try {
      let response = await fetch(`${apiUrl}/clubs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let clubRes = await response.json();
      console.log(clubRes);
      setClub(clubRes);
      setFollowers(clubRes.followers);
      setLoading(false);
      console.log(club);
      return clubRes;
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
    getClub(id);
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
        <Container fluid className="profileTopCard topmargin px-0">
          <Row>
            <Col xs={3}>
              {" "}
              <Card className="mt-5" style={{ borderRadius: "8px" }}>
                <img className="profileImage" src={club.crest} alt="" />
                <Card.Title className="mb-0 font-weight-bold">
                  {club.name}
                </Card.Title>
                <Card.Text className="mb-0">Donegal</Card.Text>
                <Card.Text className="mb-0">Followers</Card.Text>
                <Button
                  className="mr-2 messagebutton px-3 py-1 mb-3"
                  variant="success"
                >
                  Message
                </Button>
              </Card>
            </Col>
            <Col xs={9}>
              <Card
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  borderRadius: "8px",
                }}
                className="mt-5"
              >
                <Card.Body className="py-4 px-4">
                  <Card.Title class="sectionheader pb-3">
                    Upcoming Events
                  </Card.Title>
                  <Card.Text class="sectiontext mb-0">None to show</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* <Row>
            {club.followers.map((follower) => (
              <Col>
                <Link to={`/profile/${follower._id}`}>
                  <Card className="mt-5" style={{ borderRadius: "8px" }}>
                    <Image src={follower.picture} alt="" roundedCircle />
                    <Card.Text className="mb-0">{follower.username}</Card.Text>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row> */}
        </Container>
      )}
      <CarouselUser array={followers} />
    </div>
  );
};

export default withRouter(Club);
