import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Card,
  Carousel,
  Spinner,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

// import PeopleSection from "./PeopleSection";
import { Link, withRouter } from "react-router-dom";
import logo from "../data/logo.PNG";
import pic1 from "../data/bg.PNG";
import CarouselCounty from "./CarouselCounty";
import MatchCard from "./MatchCard";
// import Cube from "./Cube";
// import countiesArray from "../data/counties.json";

const Home = () => {
  const [user, setUser] = useState();
  const [counties, setCounties] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  const apiUrl = "http://localhost:5000";

  const getProfile = async () => {
    try {
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
      // setLoading(false);
      console.log(user);
      return userRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getMatches = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let matchesRes = await response.json();
      console.log(matchesRes);
      setMatches(matchesRes.slice(0, 3));
      // setLoading(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getCounties = async () => {
    try {
      let response = await fetch(`${apiUrl}/counties`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let countiesRes = await response.json();
      console.log(countiesRes);
      setCounties(countiesRes);
      setLoading(false);
      console.log(counties);
      return countiesRes;
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
    getMatches();
    getCounties();
  }, []);

  return (
    // <Container className="mt-3">
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container fluid>
          {/* <Cube /> */}
          <Carousel className="my-5" id="homeCarousel">
            {matches.map((match) => (
              <Carousel.Item interval={5000} className="carousel-pic">
                <img src={match.image} alt="slide" />
                <Carousel.Caption>
                  <Link to={`match/${match._id}`}>
                    <h3>
                      <strong>
                        {match.homeTeam.name} vs {match.awayTeam.name}
                      </strong>
                    </h3>
                  </Link>
                  <p>{match.description}</p>{" "}
                  <Link to={`match/${match._id}#ticketButton`}>
                    {/* <Button>GET TICKETS</Button> */}
                    <span className="ticket-button">GET TICKETS</span>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* <div>
            <h3>UPCOMING EVENTS</h3>
          </div>
          <Row className="mb-5">
            {matches.map((match) => (
              <Col xs={6} sm={4}>
                <Card className="mb-3">
                  <Link to={`match/${match._id}`}>
                    <Card.Img
                      variant="top"
                      src={match.image}
                      className="card-img"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      {match.homeTeam.name} vs {match.awayTeam.name}
                    </Card.Title>
                    <Card.Text>{match.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{match.venue}</ListGroupItem>
                    <ListGroupItem>{match.entryFee}</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Link to={`match/${match._id}#ticketButton`}>
                      <Button>GET TICKETS</Button>{" "}
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row> */}

          <div id="card-section">
            <div>
              <h3>UPCOMING EVENTS</h3>
            </div>
            <Row className="mb-5">
              {matches.map((match) => (
                <Col xs={12} sm={6} md={4} className="mb-2">
                  {/* <Card className="mb-3"> */}
                  <div>
                    <Link to={`match/${match._id}`}>
                      <Card.Img
                        variant="top"
                        src={match.image}
                        className="card-img"
                      />
                    </Link>
                    <Link to={`match/${match._id}`}>
                      <div>
                        <div>
                          <strong>
                            {match.homeTeam.name} vs {match.awayTeam.name}
                          </strong>
                        </div>
                        <div>{match.description}</div>
                      </div>
                    </Link>

                    <div>
                      <Link to={`match/${match._id}#ticketButton`}>
                        <div className="ticket-wrapper">
                          <span className="ticket-button">GET TICKETS</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          {/* <div>
            <h3>UPCOMING EVENTS</h3>
          </div>
          <Row className="mb-5">
            {matches.map((match) => (
              <Col xs={6} sm={4}>
                <MatchCard>{match}</MatchCard>
              </Col>
            ))}
          </Row> */}

          {/* <Row className="mb-5">
            {matches.map((match) => (
              <Col xs={6} sm={4}>
                <Accordion defaultActiveKey="0">
                  <Card className="mb-3">
                    <Link to={`match/${match._id}`}>
                      <Card.Img
                        variant="top"
                        src={match.image}
                        className="card-img"
                      />
                    </Link>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <strong>{match.description}</strong>
                      {match.homeTeam.name} vs {match.awayTeam.name}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroupItem>{match.venue}</ListGroupItem>
                          <ListGroupItem>{match.entryFee}</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                          <Link to={`match/${match._id}#ticketButton`}>
                            <Button>GET TICKETS</Button>
                          </Link>
                        </Card.Body>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            ))}
          </Row> */}

          <Row className="pb-5">
            <CarouselCounty array={counties} />
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Home;
