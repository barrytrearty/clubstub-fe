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
import { useDispatch } from "react-redux";

// import PeopleSection from "./PeopleSection";
import { Link, withRouter } from "react-router-dom";
import logo from "../data/logo.PNG";
import pic1 from "../data/bg.PNG";
import CarouselCounty from "./CarouselCounty";
import MatchCard from "./MatchCard";
import Cube from "./Cube";
// import countiesArray from "../data/counties.json";

const Home = () => {
  // const [user, setUser] = useState();
  const [counties, setCounties] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  // const token = localStorage.getItem("accessToken");

  const apiUrl = "http://localhost:5000";

  // const getProfile = async () => {
  //   try {
  //     let response = await fetch(`${apiUrl}/users/me`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     let userRes = await response.json();
  //     console.log(userRes);
  //     setUser(userRes);
  //     // setLoading(false);
  //     console.log(user);
  //     return userRes;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      setMatches(matchesRes);
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
    // getProfile();
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
          <Cube array={matches} />
          {/* <Carousel className="my-5" id="homeCarousel">
            {matches.map((match) => (
              <Carousel.Item interval={5000} className="carousel-pic">
                <img src={match.image} alt="slide" />

                <Carousel.Caption>
                  <div className="itemContainer">
                    <Link to={`match/${match._id}`}>
                      <h3>
                        <strong>
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </strong>
                      </h3>
                    </Link>
                    <p>{match.description}</p>{" "}
                    <Link to={`match/${match._id}#ticketButton`}>
                      <span className="ticket-button">GET TICKETS</span>
                    </Link>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel> */}

          <div id="card-section">
            <div>
              <h3 className="heading-county">UPCOMING EVENTS</h3>
            </div>
            <Row className="mb-3">
              {matches.map((match) => (
                <Col xs={12} sm={6} md={4} className="mb-2">
                  <div className="card-section-card">
                    <Link to={`match/${match._id}`}>
                      <img src={match.image} alt="" className="card-img" />
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

          <div>
            <h3 className="heading-county">COUNTIES</h3>
          </div>
          <div className="crestRow">
            {counties.map((county) => (
              <div className="crestHolder">
                <Link to={`county/${county.name}`}>
                  <img src={county.crest} alt="" className="crestImage" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      )}
      <footer>Find us on social media</footer>
    </div>
  );
};

export default Home;
