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
import { useSelector } from "react-redux";

// import pic1 from "../data/bg.PNG";
import CarouselCounty from "../Carousels/CarouselCounty";
// import MatchCard from "../MatchCard";
import Cube from "../Cube/Cube";
// import countiesArray from "../data/counties.json";

const Home = () => {
  // const [user, setUser] = useState();
  const [counties, setCounties] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchesValue, setMatchesValue] = useState([]);
  const [matchesSoon, setMatchesSoon] = useState([]);
  const [loading, setLoading] = useState(true);

  // const token = localStorage.getItem("accessToken");
  const isAdmin = useSelector((state) => state.userInfo.role);
  let matchOrEdit = isAdmin === "Admin" ? "editMatch" : "match";

  const apiUrl = "http://localhost:5000";

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
      setMatches(matchesRes.slice(0, 4));
      // setLoading(false);
      // console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getMatchesValue = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches/value`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let matchesRes = await response.json();
      console.log(matchesRes);
      setMatchesValue(matchesRes.slice(0, 4));
      // setLoading(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getMatchesSoon = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches/upNext`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let matchesRes = await response.json();
      // console.log(matchesRes);
      setMatchesSoon(matchesRes.slice(0, 4));
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
    getMatchesValue();
    getMatchesSoon();
    getCounties();
  }, []);

  return (
    // <Container className="mt-3">
    <div id="home-container">
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <Cube array={matches} />

          {/* <Container fluid> */}
          <div class="card-section afterCube">
            <div>
              <h3 className="home-heading">Featured Matches</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {matches.map((match) => (
                <Col xs={12} sm={6} lg={3} className="mb-4">
                  <div className="card-section-card">
                    <Link to={`${matchOrEdit}/${match._id}`}>
                      <img src={match.image} alt="" className="card-img" />
                    </Link>
                    <Link to={`${matchOrEdit}/${match._id}`}>
                      <div>
                        <div>
                          <strong>
                            {match.homeTeam.name} vs {match.awayTeam.name}
                          </strong>
                        </div>
                        <div>{match.description}</div>
                      </div>
                    </Link>

                    {/* <div>
                      <Link to={`${matchOrEdit}/${match._id}#ticketButton`}>
                        <div className="ticket-wrapper">
                          <span className="ticket-button">GET TICKETS</span>
                        </div>
                      </Link>
                    </div> */}
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div class="card-section">
            <div>
              <h3 className="home-heading">Up Next</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {matchesSoon.map((match) => (
                <Col xs={12} sm={6} lg={3} className="mb-4">
                  <div className="card-section-card">
                    <Link to={`${matchOrEdit}/${match._id}`}>
                      <img src={match.image} alt="" className="card-img" />
                    </Link>
                    <Link to={`${matchOrEdit}/${match._id}`}>
                      <div>
                        <div>
                          <strong>
                            {match.homeTeam.name} vs {match.awayTeam.name}
                          </strong>
                        </div>
                        <div>{match.description}</div>
                      </div>
                    </Link>

                    {/* <div>
                      <Link to={`${matchOrEdit}/${match._id}#ticketButton`}>
                        <div className="ticket-wrapper">
                          <span className="ticket-button">GET TICKETS</span>
                        </div>
                      </Link>
                    </div> */}
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div class="card-section">
            <div>
              <h3 className="home-heading">Bang for your Buck</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {matchesValue.map((match) => (
                <Col xs={12} sm={6} lg={3} className="mb-4">
                  <div className="card-section-card">
                    <Link to={`${matchOrEdit}/${match._id}`}>
                      <img src={match.image} alt="" className="card-img" />
                    </Link>
                    <Link to={`${matchOrEdit}/${match._id}`}>
                      <div>
                        <div>
                          <strong>
                            {match.homeTeam.name} vs {match.awayTeam.name}
                          </strong>
                        </div>
                        <div>{match.description}</div>
                      </div>
                    </Link>

                    {/* <div>
                      <Link to={`match/${match._id}#ticketButton`}>
                        <div className="ticket-wrapper">
                          <span className="ticket-button">GET TICKETS</span>
                        </div>
                      </Link>
                    </div> */}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          {/* </Container> */}

          <div>
            <h3 className="home-heading">COUNTIES</h3>
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
        </div>
      )}
      <footer>
        <h3>About author</h3>
        <div class="footer-text-container">
          <img
            src="https://res.cloudinary.com/btrearty/image/upload/v1634040287/linked-products/u31qfd3uhxobmzxozubf.jpg"
            alt=""
          />
          <div>
            <p>
              My name is Barry and I am a graduate of Strive School. I have a
              love of programming and web development and it was Strive School
              that helped me to channel and harness this love. I have created
              this site as my final project.
            </p>
            <p>
              Feel free to peruse my github and portfolio and please get in
              contact if you so wish. Thank you
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
