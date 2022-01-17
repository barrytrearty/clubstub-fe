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
// import CarouselCounty from "../Carousels/CarouselCounty";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import "./Manage.css";
import { TiPlusOutline } from "react-icons/ti";
import { Link, withRouter } from "react-router-dom";

const AllMatches = () => {
  const id = useSelector((state) => state.userInfo._id);
  const isAdmin = useSelector((state) => state.userInfo.role);
  let matchOrEdit = isAdmin === "Admin" ? "editMatch" : "match";

  const [matches, setMatches] = useState([]);
  const apiUrl = "http://localhost:5000";
  const [comps, setComps] = useState([]);
  //   const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getComps = async () => {
    try {
      let response = await fetch(`${apiUrl}/competitions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let compsRes = await response.json();
      console.log(compsRes);
      setComps(compsRes);
      // setLoading(false);
      console.log(comps);
      return compsRes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
    getComps();
    // getClubs();
  }, []);

  if (id === "") {
    return <Redirect to="/login" />;
  }

  return (
    // <div>
    //   {id === "" ? (
    //     <Login />
    //   ) : (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <div class="card-section afterNavbar">
            <div>
              <h3 className="home-heading">Competitions</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {isAdmin === "Admin" ? (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Link to="/addComp">
                    <div className="addNew">
                      <TiPlusOutline className="plus" />
                      <div>Add Competition</div>
                    </div>
                  </Link>
                </Col>
              ) : (
                ""
              )}

              {comps.map((comp) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="card-section-card">
                    {/* <Link to={`/${comp._id}`}> */}
                    <img src={comp.image} alt="" className="card-img" />
                    {/* </Link> */}
                    {/* <Link to={`${matchOrEdit}/${match._id}`}> */}
                    <div>
                      <div>
                        <strong>{comp.description}</strong>
                      </div>
                      {/* <div>{comp.description}</div> */}
                    </div>
                    {/* </Link> */}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div class="card-section">
            <div>
              <h3 className="home-heading">Matches</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {isAdmin === "Admin" ? (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Link to="/addMatch">
                    <div className="addNew">
                      <TiPlusOutline className="plus" />
                      <div>Add Match</div>
                    </div>
                  </Link>
                </Col>
              ) : (
                ""
              )}
              {matches.map((match) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
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
        </div>
      )}
    </div>
    //   )}
    // </div>
  );
};

export default AllMatches;
