import { useState, useEffect } from "react";
import { Col, Container, Row, Card, Spinner } from "react-bootstrap";

// import PeopleSection from "./PeopleSection";
import { withRouter } from "react-router-dom";

const Club = ({ match }) => {
  const { id } = match.params;

  const apiUrl = process.env.REACT_APP_BE;
  const [club, setClub] = useState();
  // const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  const getClub = async (id) => {
    try {
      let response = await fetch(`${apiUrl}/clubs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let clubRes = await response.json();
      console.log(clubRes);
      setClub(clubRes);
      // setFollowers(clubRes.followers);
      setLoading(false);
      console.log(club);
      return clubRes;
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
    getClub(id);
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container>
          <div className="profileTopCard topmargin px-0">
            <Row>
              <Col xs={12} sm={9}>
                <Card
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                    borderRadius: "8px",
                  }}
                  className="mt-5"
                >
                  <Card.Body className="py-4 px-4">
                    <Card.Title class="sectionheader pb-3">
                      Upcoming Events
                    </Card.Title>
                    <Card.Text class="sectiontext mb-0">None to show</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={10} sm={3}>
                {" "}
                <div
                  id="county-card"
                  className="mt-5"
                  style={{ borderRadius: "8px" }}
                >
                  <img className="profileImage" src={club.crest} alt="" />
                  <div className="mb-0 font-weight-bold">{club.name}</div>
                  <div className="mb-0">Donegal</div>
                  <div className="mb-0">Followers</div>
                  <div className="ticket-wrapper">
                    <div className="messagebutton ticket-button">Message</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      )}
      {/* <CarouselUser array={followers} /> */}
    </div>
  );
};

export default withRouter(Club);
