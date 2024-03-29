import { withRouter, Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container, Spinner, Modal, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import "./Match.css";
// import CheckoutForm from "./CheckoutForm";

const Match = ({ match }) => {
  const { id } = match.params;
  const checkLoginId = useSelector((state) => state.userInfo._id);

  const apiUrl = process.env.REACT_APP_BE;
  const [matchObj, setMatchobj] = useState();
  const [matchId, setMatchId] = useState("");
  const [loading, setLoading] = useState(true);

  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const token = localStorage.getItem("accessToken");

  //Modal stuff
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getMatch = async (id) => {
    try {
      let response = await fetch(`${apiUrl}/matches/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let matchRes = await response.json();
      console.log(matchRes);
      setMatchobj(matchRes);
      setMatchId(matchRes._id);
      setLoading(false);
      console.log(matchObj);
      return matchRes;
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      const bodyInfo = { match: matchId, numberOfTickets };
      console.log(bodyInfo);
      let response = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        body: JSON.stringify(bodyInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let matchRes = await response.json();
      // console.log(matchRes);
      // console.log(matchObj);
      return matchRes;
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
    getMatch(id);
  }, []);

  // useEffect(() => {
  //   document.getElementById("buyTicketBar").style.opacity = 1;
  // }, [loading]);

  const handleToken = async (token, addresses) => {
    handleClose();
    console.log({ token, addresses });

    const response = await axios.post(`${apiUrl}/matches/checkout`, {
      token,
      matchObj,
    });
    const { status } = response.data;
    console.log("Response:", response.data);
    const receiverEmail = token.email;
    if (status === "success") {
      createOrder();
      const response2 = await axios.post(`${apiUrl}/matches/qrCode`, {
        receiverEmail,
        matchObj,
      });

      console.log(response2.data);
      // createOrder();
    } else {
      console.log("Nooooooooooo");
      // toast("Something went wrong", { type: "error" });
    }
  };

  if (checkLoginId === "") {
    return <Redirect to="/login" />;
  }

  return (
    // <div>
    //   {checkLoginId === "" ? (
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
        <div className="py-5">
          <img src={matchObj.image} alt="" className="match-image" />
          <Container id="match-details-holder" className="pb-5">
            <h1>
              {matchObj.competition.description} {matchObj.description}
            </h1>
            <Row>
              {" "}
              <Col xs={12} md={6}>
                {" "}
                <h2>Description: </h2>
                <div className="match-detail">
                  {/* <img
                    src={matchObj.homeTeam.crest}
                    alt=""
                    className="match-team-image"
                  /> */}
                  <span>
                    {matchObj.homeTeam.name} vs {matchObj.awayTeam.name}
                  </span>

                  {/* <img
                    src={matchObj.awayTeam.crest}
                    alt=""
                    className="match-team-image"
                  /> */}
                </div>
                <h2>Venue: </h2>
                <div className="match-detail">{matchObj.venue}</div>
                <h2>Date and Time: </h2>
                <div className="match-detail">
                  {matchObj.time} on {matchObj.displayDate}
                </div>
                <h2>Entry Fee: </h2>
                <div className="match-detail">
                  General admission - €{matchObj.entryFee}
                </div>
                <h2>Tickets remaining: </h2>
                <div className="match-detail">{matchObj.capacity}</div>
                <div className="ticket-wrapper my-4">
                  <button
                    className="ticket-button"
                    onClick={handleShow}
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
          <div id="buyTicketBar">
            <button className="ticket-button" onClick={handleShow}>
              GET TICKETS
            </button>
          </div>
          {/* <Button onClick={handleShow} id="ticketButton">
            Get Tickets
          </Button> */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {matchObj.competition.description} {matchObj.description}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {matchObj.homeTeam.name} vs {matchObj.awayTeam.name}
              <div>Time: {matchObj.time}</div>
              <div>Date: {matchObj.displayDate} </div>
              <div>
                <strong>General Admission</strong>: €{matchObj.entryFee}
              </div>
              <div>
                <label for="tickets">Number of tickets </label>
                <select
                  name="tickets"
                  id="tickets"
                  onChange={(e) => setNumberOfTickets(e.target.value)}
                  className="ml-2"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div>
                <strong>Total</strong>: €{matchObj.entryFee * numberOfTickets}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="cancel-button" onClick={handleClose}>
                Cancel
              </button>

              <StripeCheckout
                stripeKey="pk_test_51K3f3oE5lYsTD6vYHP3LmaWjfYfqPPWdd8jAr8CYIokpPEY6PHm515xCLhoArxpGXDdELmt0KW4Zisy0aHo2S2yd00a5MREuo4"
                token={handleToken}
                amount={matchObj.entryFee * numberOfTickets * 100}
                name={matchObj.competition.description}
                billingAddress
                shippingAddress
              />
              {/* <Button variant="success" onClick={showStripeCheckout}>
                Pay with Stripe
              </Button> */}
            </Modal.Footer>
          </Modal>
          {/* {showStripe ?? <CheckoutForm />} */}
        </div>
      )}
    </div>
    //   )}
    // </div>
  );
};

export default withRouter(Match);
