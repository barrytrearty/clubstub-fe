import { useState, useEffect } from "react";
import { Col, Container, Spinner, Row, Card } from "react-bootstrap";

const Profile = ({ match }) => {
  const id = match.params.id;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_PROD_BE;
  const token = localStorage.getItem("accessToken");

  const getProfile = async () => {
    try {
      let response = await fetch(`${apiUrl}/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let userRes = await response.json();
      console.log(userRes);
      setUser(userRes);
      setLoading(false);
      console.log(user);
      return userRes;
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
    getProfile();
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
        <Container className="profileTopCard topmargin px-0">
          <Row>
            <Col xs={3}>
              {" "}
              <div
                id="county-card"
                className="mt-5"
                style={{ borderRadius: "8px" }}
              >
                <img className="profileImageUser" src={user.picture} alt="" />
                <div className="mb-0 font-weight-bold username">
                  {user.username}
                </div>
                <div className="mb-0">Donegal</div>
                <div>
                  <span className="mr-1">Followers</span>
                  <span className="mr-1">Following</span>
                </div>
                <div className="ticket-wrapper">
                  <div className="messagebutton ticket-button match-text">
                    Follow
                  </div>
                </div>
              </div>
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
                  <Card.Title class="sectionheader pb-3">
                    Upcoming Events
                  </Card.Title>
                  <Card.Text class="sectiontext mb-0">None to show</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card
            style={{
              width: "100%",
              marginTop: "1rem",
              borderRadius: "8px",
            }}
            className="mb-3"
          >
            <Card.Body className="py-4 px-4">
              <Card.Title class="sectionheader pb-3">
                Carousel with Club/County Teams
              </Card.Title>
              <Card.Text class="sectiontext mb-0">None to show</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      )}

      {/* <Col xs={12} sm={12}>
        <PeopleSection marginTop={true} sectionTitle="People who follow" />
        <PeopleSection marginTop={false} sectionTitle="Other clubs" />
      </Col> */}
    </div>
  );
};

export default Profile;
