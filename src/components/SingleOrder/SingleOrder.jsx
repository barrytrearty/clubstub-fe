import { withRouter, Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container, Spinner, Modal, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const SingleOrder = ({ match }) => {
  const { orderId } = match.params;
  const checkLoginId = useSelector((state) => state.userInfo._id);

  const apiUrl = process.env.REACT_APP_BE;
  const [matchObj, setMatchobj] = useState();
  const [orderObj, setOrderObj] = useState();
  const [matchId, setMatchId] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  const getOrder = async (id) => {
    try {
      let response = await fetch(`${apiUrl}/order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let orderRes = await response.json();
      console.log(orderRes);
      setOrderObj(orderRes);
      //   setOrderId(orderRes._id);
      setLoading(false);
      console.log(orderObj);
      return orderRes;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="py-5">
          <img src={matchObj.image} alt="" className="match-image" />
          <Container id="match-details-holder" className="pb-5">
            <Row>
              {" "}
              <Col xs={12} md={6}>
                {" "}
                <h2>Description: </h2>
                <h3>
                  {matchObj.competition.description} {matchObj.description}
                </h3>
                <div className="match-detail">
                  <img
                    src={matchObj.homeTeam.crest}
                    alt=""
                    className="match-team-image"
                  />
                  <span>
                    {matchObj.homeTeam.name} vs {matchObj.awayTeam.name}
                  </span>

                  <img
                    src={matchObj.awayTeam.crest}
                    alt=""
                    className="match-team-image"
                  />
                </div>
                <h2>Venue: </h2>
                <div className="match-detail">{matchObj.venue}</div>
                <h2>Date and Time: </h2>
                <div className="match-detail">Time: {matchObj.time}</div>
                <div className="match-detail">Date: {matchObj.displayDate}</div>
                <h2>Entry Fee: </h2>
                <div className="match-detail">
                  Entry Fee: €{matchObj.entryFee}
                </div>
                <h2>Tickets remaining: </h2>
                <div className="match-detail">{matchObj.capacity}</div>
                <div className="ticket-wrapper my-4">
                  <button
                    className="ticket-button"
                    // onClick={handleShow}
                    id="ticketButton"
                  >
                    GET TICKETS
                  </button>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <h2>Featured</h2>
                <h3>Teams</h3>
                <Row>
                  <Col xs={6}>
                    {" "}
                    <div className="card-section-card">
                      <Link to={`editClub/${matchObj.homeTeam._id}`}>
                        <img
                          src={matchObj.homeTeam.crest}
                          alt=""
                          className="card-img"
                        />
                      </Link>
                      <div className="team-section-card-info">
                        <Link to={`editClub/${matchObj.homeTeam._id}`}>
                          <span className="team-section-card-title truncate">
                            {matchObj.homeTeam.name}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    {" "}
                    <div className="card-section-card">
                      <Link to={`editClub/${matchObj.homeTeam._id}`}>
                        <img
                          src={matchObj.awayTeam.crest}
                          alt=""
                          className="card-img"
                        />
                      </Link>
                      <div className="team-section-card-info">
                        <Link to={`editClub/${matchObj.homeTeam._id}`}>
                          <span className="team-section-card-title truncate">
                            {matchObj.awayTeam.name}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>

                <h3>Competition</h3>
                <Row>
                  <Col>
                    <Link to={`/matches`}>
                      <div className="card-section-card">
                        <img
                          src={matchObj.competition.image}
                          alt=""
                          className="card-img"
                        />
                        {/* </Link> */}
                        {/* <Link to={`${matchOrEdit}/${match._id}`}> */}
                        <div>
                          <div className="comp-section-card-title">
                            {matchObj.competition.description}
                          </div>
                          {/* <div>{comp.description}</div> */}
                        </div>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default SingleOrder;
