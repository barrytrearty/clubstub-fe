import { Link, withRouter } from "react-router-dom";
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
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
// import CheckoutForm from "./CheckoutForm";

const Match = ({ match }) => {
  const { id } = match.params;

  const apiUrl = "http://localhost:5000";
  const [matchObj, setMatchobj] = useState();
  const [loading, setLoading] = useState(true);
  const [noOfTickets, setNoOfTickets] = useState(1);
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
      setLoading(false);
      console.log(matchObj);
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
      handleClose();
    } else {
      console.log("Nooooooooooo");
      // toast("Something went wrong", { type: "error" });
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container className="match-text">
          <Image src={matchObj.image} fluid />
          <h1>{matchObj.description}</h1>
          <h2>
            {matchObj.homeTeam.name} vs {matchObj.awayTeam.name}
          </h2>
          <h2>{matchObj.venue}</h2>
          <div>Time {matchObj.time}</div>
          <div>Date {matchObj.date}</div>
          <span
            className="ticket-button"
            onClick={handleShow}
            id="ticketButton"
          >
            GET TICKETS
          </span>
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
                  onChange={(e) => setNoOfTickets(e.target.value)}
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
                <strong>Total</strong>: €{matchObj.entryFee * noOfTickets}
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
                amount={matchObj.entryFee * noOfTickets * 100}
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
  );
};

export default withRouter(Match);
