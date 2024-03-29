import { useState, useEffect } from "react";
import { Col, Container, Row, Card, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const County = ({ match }) => {
  const { id } = match.params;

  const apiUrl = process.env.REACT_APP_BE;
  const [county, setCounty] = useState({});
  // const [countyName, setCountyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const token = localStorage.getItem("accessToken");

  const getCounty = async (id) => {
    try {
      let response = await fetch(`${apiUrl}/counties/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let countyRes = await response.json();
      console.log(countyRes);
      setCounty(countyRes);
      console.log(county);
      // setLoading(false);
      return countyRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getClubs = async (id) => {
    try {
      let response = await fetch(`${apiUrl}/clubs/county/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let clubsRes = await response.json();
      console.log(clubsRes);
      setClubs(clubsRes);
      // setClubs(clubsRes.clubs);
      // setLoading(false);
      console.log(clubs);
      console.log(county);
      setLoading(false);
      return clubsRes;
    } catch (error) {
      console.log(error);
    }
  };

  // const getClubs = async (id) => {
  //   try {
  //     let response = await fetch(`${apiUrl}/counties/${id}/clubs`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     let clubsRes = await response.json();
  //     console.log(clubsRes);
  //     setClubs(clubsRes);
  //     // setClubs(clubsRes.clubs);
  //     // setLoading(false);
  //     // console.log(clubs);
  //     console.log(county);
  //     setLoading2(false);
  //     return clubsRes;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramToken = params.get("accessToken");

    if (paramToken) {
      localStorage.setItem("accessToken", paramToken);
    }
    getCounty(id);
    getClubs(id);
    // getClubs(id);
    // setLoading(false);
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
        <Container className="full-height">
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
                    <Card.Title className="sectionheader pb-3">
                      Upcoming Events
                    </Card.Title>
                    <Card.Text className="sectiontext mb-0">
                      None to show
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={10} sm={3}>
                <div
                  id="county-card"
                  className="mt-5"
                  style={{ borderRadius: "8px" }}
                >
                  <img className="profileImage" src={county.crest} alt="" />
                  <div className="mb-0 font-weight-bold">{county.name}</div>
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
    </div>
  );
};

export default withRouter(County);
