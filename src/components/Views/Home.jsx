import { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

// import PeopleSection from "./PeopleSection";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCalendarCheck } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";

import Cube from "../Cube/Cube";

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

  const apiUrl = process.env.REACT_APP_BE;

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
                      <div className="card-section-card-info">
                        <div className="card-section-card-title">
                          {match.competition.description} {match.description}
                        </div>
                        <div className="card-section-card-teams">
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </div>

                        <div>
                          <FiMapPin /> {match.venue}
                        </div>
                        <div>
                          <BsCalendarCheck /> {match.date}
                        </div>
                        <div>
                          <BiTimeFive /> {match.time}
                        </div>
                        <div className="card-section-card-price">
                          €{match.entryFee}.00
                        </div>
                      </div>
                    </Link>
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
                      <div className="card-section-card-info">
                        <div className="card-section-card-title">
                          {match.competition.description} {match.description}
                        </div>
                        <div className="card-section-card-teams">
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </div>

                        <div>
                          <FiMapPin /> {match.venue}
                        </div>
                        <div>
                          <BsCalendarCheck /> {match.date}
                        </div>
                        <div>
                          <BiTimeFive /> {match.time}
                        </div>
                        <div className="card-section-card-price">
                          €{match.entryFee}.00
                        </div>
                      </div>
                    </Link>
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
                      <div className="card-section-card-info">
                        <div className="card-section-card-title">
                          {match.competition.description} {match.description}
                        </div>
                        <div className="card-section-card-teams">
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </div>

                        <div>
                          <FiMapPin /> {match.venue}
                        </div>
                        <div>
                          <BsCalendarCheck /> {match.date}
                        </div>
                        <div>
                          <BiTimeFive /> {match.time}
                        </div>
                        <div className="card-section-card-price">
                          €{match.entryFee}.00
                        </div>
                      </div>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

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
        <div className="footerCont">
          <h3>About author</h3>
          <div class="footer-text-container">
            <img
              src="https://res.cloudinary.com/btrearty/image/upload/v1634040287/linked-products/u31qfd3uhxobmzxozubf.jpg"
              alt=""
            />
            <div>
              <p>My name is Barry and I am a graduate of Strive School. </p>
              <p>
                I am a Fullstack developer centered on the MERN stack with a
                special focus on the frontend.
              </p>
              <p>
                This site is a prototype site for a GAA ticket vendor. It was
                built using React, Redux, node.js, Express and MongoDB
              </p>
              <p>
                Feel free to check out my github and portfolio and don't
                hesitate to get in touch. Thank you
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
