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
import Login from "./Login/Login";
// import CheckoutForm from "./CheckoutForm";

const Match = ({ match }) => {
  const { id } = match.params;
  const checkLoginId = useSelector((state) => state.userInfo._id);

  const apiUrl = "http://localhost:5000";
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

  const handleToken = async (token, addresses) => {
    handleClose();
    console.log({ token, addresses });
    const product = {
      name: matchObj.id,
      price: matchObj.entryFee,
      description: matchObj.description,
    };
    const response = await axios.post(`${apiUrl}/matches/checkout`, {
      token,
      product,
    });
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      // toast("Success! Check email for details", { type: "success" });
      console.log("Nooooice");
      createOrder();
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
        <Container className="match-text pb-5">
          <img src={matchObj.image} alt="" className="match-image" />
          <div id="match-details-holder">
            <h1>{matchObj.description}</h1>

            <div className="match-detail">
              <img
                src={matchObj.homeTeam.crest}
                alt=""
                className="match-team-image"
              />
              {matchObj.homeTeam.name} vs {matchObj.awayTeam.name}
              <img
                src={matchObj.awayTeam.crest}
                alt=""
                className="match-team-image"
              />
            </div>
            <h2 className="mt-4">The location</h2>
            <div className="match-detail">{matchObj.venue}</div>
            <h2 className="mt-4">Time</h2>
            <div className="match-detail">{matchObj.time}</div>
            <h2 className="mt-4">Date</h2>
            <div className="match-detail">{matchObj.date}</div>

            <div className="ticket-wrapper my-4">
              <span
                className="ticket-button"
                onClick={handleShow}
                id="ticketButton"
              >
                GET TICKETS
              </span>
            </div>
          </div>
          {/* <Button onClick={handleShow} id="ticketButton">
            Get Tickets
          </Button> */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{matchObj.description}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {matchObj.homeTeam.name} vs {matchObj.awayTeam.name}
              <div>Time {matchObj.time}</div>
              <div>Date {matchObj.date} </div>
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
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
              <StripeCheckout
                stripeKey="pk_test_51K3f3oE5lYsTD6vYHP3LmaWjfYfqPPWdd8jAr8CYIokpPEY6PHm515xCLhoArxpGXDdELmt0KW4Zisy0aHo2S2yd00a5MREuo4"
                token={handleToken}
                amount={matchObj.entryFee * numberOfTickets * 100}
                name={matchObj.description}
                billingAddress
                shippingAddress
              />
              {/* <Button variant="success" onClick={showStripeCheckout}>
                Pay with Stripe
              </Button> */}
            </Modal.Footer>
          </Modal>
          {/* {showStripe ?? <CheckoutForm />} */}
        </Container>
      )}
    </div>
    //   )}
    // </div>
  );
};

export default withRouter(Match);
