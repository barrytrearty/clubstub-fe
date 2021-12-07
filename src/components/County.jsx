import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Card,
  Spinner,
} from "react-bootstrap";
import CarouselClub from "./CarouselClub";

// import PeopleSection from "./PeopleSection";
import { Link, withRouter } from "react-router-dom";
import logo from "../data/logo.PNG";

const County = ({ match }) => {
  const { id } = match.params;

  const apiUrl = "http://localhost:5000";
  const [county, setCounty] = useState();
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
      setClubs(countyRes.clubs);
      // setLoading(false);
      // console.log(clubs);
      console.log(county);
      setLoading(false);
      return countyRes;
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
        <Container fluid>
          <div className="profileTopCard topmargin px-0">
            <Row>
              <Col xs={3}>
                <Card className="mt-5" style={{ borderRadius: "8px" }}>
                  <img className="profileImage" src={county.crest} alt="" />
                  <Card.Title className="mb-0 font-weight-bold">
                    {county.name}
                  </Card.Title>
                  <Card.Text className="mb-0">Donegal</Card.Text>
                  <Card.Text className="mb-0">Followers</Card.Text>
                  <Button
                    className="mr-2 messagebutton px-3 py-1 mb-3"
                    variant="success"
                  >
                    Message
                  </Button>
                </Card>
              </Col>
              <Col xs={9}>
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
            </Row>
          </div>
        </Container>
      )}
      <CarouselClub array={clubs} />
    </div>
  );
};

export default withRouter(County);
