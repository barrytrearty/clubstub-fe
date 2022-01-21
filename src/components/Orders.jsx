import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

import { AiTwotoneCalendar } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { AiOutlineClockCircle } from "react-icons/ai";

const Orders = ({ match }) => {
  const id = useSelector((state) => state.userInfo._id);
  const isAdmin = useSelector((state) => state.userInfo.role);

  const apiUrl = process.env.REACT_APP_PROD_BE;
  const [orders, setOrders] = useState([]);
  const [adminMatches, setAdminMatches] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  const getOrders = async () => {
    try {
      let response = await fetch(`${apiUrl}/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let ordersRes = await response.json();
      console.log(ordersRes);
      setOrders(ordersRes);
      setLoading(false);
      console.log(orders);
      return ordersRes;
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
      setMatches(matchesRes);
      // setLoading(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminMatches = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches/admin/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let matchesRes = await response.json();
      console.log(matchesRes);
      setAdminMatches(matchesRes);
      setLoading(false);
      // console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramToken = params.get("accessToken");
    console.log(orders[0]);
    getMatches();

    if (paramToken) {
      localStorage.setItem("accessToken", paramToken);
    }
    isAdmin === "Admin" ? getAdminMatches() : getOrders();
  }, []);

  if (id === "") {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      ) : (
        <Container>
          {isAdmin === "Admin" ? (
            <div>
              <h2>Matches created by you</h2>
              <div>
                <button>Last 7 day</button>
                <button>Last 30 day</button>
              </div>
              {adminMatches.map((match) => (
                <Link to={`editMatch/${match._id}`}>
                  <Row id="event-card">
                    <Col xs={12} sm={3}>
                      {" "}
                      <img src={match.image} alt="" className="eventImage" />
                    </Col>
                    <Col xs={12} sm={9}>
                      <h3 className="username">{match.description}</h3>
                      <div>
                        <ImLocation /> {match.venue}
                      </div>
                      <div>
                        <AiTwotoneCalendar /> {match.date}
                      </div>
                      <div>
                        <AiOutlineClockCircle /> {match.time}
                      </div>
                    </Col>
                  </Row>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <h2>Upcoming Events</h2>
              <div>
                <button>Next 7 day</button>
                <button>Next 30 day</button>
              </div>
              {orders[0] === undefined ? (
                <div>
                  <Row id="event-card" className="p-5">
                    <div>None to show</div>
                  </Row>
                  <h5>Featured Matches</h5>
                  <Row>
                    {matches.map((match) => (
                      <Col xs={6} sm={6} md={4} lg={3} className="mb-4">
                        <div className="card-section-card">
                          <Link to={`match/${match._id}`}>
                            <img
                              src={match.image}
                              alt=""
                              className="card-img"
                            />
                          </Link>
                          <Link to={`match/${match._id}`}>
                            <div className="card-section-card-info">
                              <div className="card-section-card-title">
                                {match.competition.description}{" "}
                                {match.description}
                              </div>
                              {/* <div className="card-section-card-teams">
                                {match.homeTeam.name} vs {match.awayTeam.name}
                              </div> */}

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
              ) : (
                orders.map((order) => (
                  <Row id="event-card">
                    <Col xs={12} sm={3}>
                      {" "}
                      <img
                        src={order.match.image}
                        alt=""
                        className="eventImage"
                      />
                    </Col>
                    <Col xs={12} sm={9}>
                      <h3 className="username">{order.match.description}</h3>
                      <div>
                        <ImLocation /> {order.match.venue}
                      </div>
                      <div>
                        <AiTwotoneCalendar /> {order.match.date}
                      </div>
                      <div>
                        <AiOutlineClockCircle /> {order.match.time}
                      </div>
                    </Col>
                  </Row>
                ))
              )}
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Orders;
