import { withRouter, Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container, Spinner, Modal, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Match.css";

// import CheckoutForm from "./CheckoutForm";

const EditMatch = ({ match, location, history }) => {
  const { id } = match.params;
  const checkLoginId = useSelector((state) => state.userInfo._id);

  const apiUrl = process.env.REACT_APP_BE;
  const [matchObj, setMatchobj] = useState();
  const [matchId, setMatchId] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  //Modal stuff
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // const handleCloseEdit = () => setShowEdit(false);
  // const handleShowEdit = () => setShowEdit(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const goToEdit = () => {
    history.push(`/editMatchForm/${id}`);
  };

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
        console.log("deleted match");
        // handleCloseDelete();
        // history.push("/matches");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMatchOrders = async () => {
    try {
      let response = await fetch(`${apiUrl}/allMatchOrders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("deleted orders");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    deleteMatch();
    deleteMatchOrders();
    handleCloseDelete();
    history.push("/matches");
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
        <div className="py-5">
          <img src={matchObj.image} alt="" className="match-image" />
          <Container id="match-details-holder">
            <h1>
              {matchObj.competition.description} {matchObj.description}
            </h1>
            <Row>
              {" "}
              <Col xs={12} md={6}>
                {" "}
                <h2>Description:</h2>
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
                <div className="my-4">
                  <button
                    className="edit-button"
                    onClick={goToEdit}
                    // id="ticketButton"
                  >
                    Edit
                  </button>
                  <button
                    className="cancel-button"
                    onClick={handleShowDelete}
                    // id="ticketButton"
                  >
                    Delete
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
                          <span className="team-section-card-title">
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
                          <span className="team-section-card-title">
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

          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete match</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete match?</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default withRouter(EditMatch);
