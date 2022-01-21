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

const EditMatch = ({ match, location, history }) => {
  const { id } = match.params;
  const checkLoginId = useSelector((state) => state.userInfo._id);

  const apiUrl = process.env.REACT_APP_PROD_BE
  const [matchObj, setMatchobj] = useState();
  const [matchId, setMatchId] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  //Modal stuff
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

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

  const deleteMatch = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // handleCloseDelete();
        history.push("/matches");
      }
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

            <div className="my-4">
              <Button
                // className="ticket-button"
                onClick={handleShowEdit}
                // id="ticketButton"
              >
                Edit
              </Button>
              <Button
                // className="ticket-button"
                onClick={handleShowDelete}
                // id="ticketButton"
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </div>

          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete match</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete match?</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={deleteMatch}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </div>
  );
};

export default withRouter(EditMatch);
