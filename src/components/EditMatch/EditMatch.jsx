import { Link, withRouter, Redirect } from "react-router-dom";
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
  Image,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

// import CheckoutForm from "./CheckoutForm";

const EditMatch = ({ match }) => {
  const { id } = match.params;
  const checkLoginId = useSelector((state) => state.userInfo._id);

  const apiUrl = "http://localhost:5000";
  const [matchObj, setMatchobj] = useState();
  const [matchId, setMatchId] = useState("");
  const [loading, setLoading] = useState(true);
  const [qrCodeImg, setQrCodeImg] = useState("");
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
        <Container className=" pb-5">
          <h2>Edit bit</h2>
          <img src={matchObj.image} alt="" className="match-image" />
          <div id="match-details-holder">
            <h2>
              {matchObj.competition.description} {matchObj.description}
            </h2>

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

            <div className="match-detail">Venue: {matchObj.venue}</div>
            <div className="match-detail">Throw in: {matchObj.time}</div>

            <div className="match-detail">Date: {matchObj.date}</div>

            <div className="match-detail">Entry Fee: €{matchObj.entryFee}</div>

            <div className="match-detail">
              Tickets remaining: {matchObj.capacity}
            </div>

            <div className="ticket-wrapper my-4">
              <Button
                className="ticket-button"
                onClick={handleShow}
                id="ticketButton"
              >
                Edit
              </Button>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default withRouter(EditMatch);
