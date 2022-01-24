import { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
// import CarouselCounty from "../Carousels/CarouselCounty";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import "./Manage.css";
import { TiPlusOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import CarouselCounty from "../Carousels/CarouselCounty";

const AllTeams = () => {
  const id = useSelector((state) => state.userInfo._id);
  const isAdmin = useSelector((state) => state.userInfo.role);
  let clubOrEdit = isAdmin === "Admin" ? "editClub" : "clubs";

  // const [matches, setMatches] = useState([]);
  const apiUrl = process.env.REACT_APP_BE;
  // const [comps, setComps] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [counties, setCounties] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCounties = async () => {
    try {
      let response = await fetch(`${apiUrl}/counties`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let countiesRes = await response.json();
      console.log(countiesRes);
      setCounties(countiesRes);
      // setLoading(false);
      console.log(counties);
      return countiesRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getClubs = async () => {
    try {
      let response = await fetch(`${apiUrl}/clubs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let clubsRes = await response.json();
      console.log(clubsRes);
      setClubs(clubsRes);
      setLoading(false);
      console.log(clubs);
      return clubsRes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getMatches();
    // getComps();
    getCounties();
    getClubs();
  }, []);

  if (id === "") {
    return <Redirect to="/login" />;
  }

  return (
    // <div>
    //   {id === "" ? (
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
        <div className="afterNavbar">
          <CarouselCounty array={counties} />
          <div className="card-section">
            <div>
              <h3 className="home-heading">Clubs</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {isAdmin === "Admin" ? (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Link to="/addTeam">
                    <div className="addNew">
                      <TiPlusOutline className="plus" />
                      <div>Add Team</div>
                    </div>
                  </Link>
                </Col>
              ) : (
                ""
              )}

              {clubs.map((club) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="card-section-card">
                    <Link to={`${clubOrEdit}/${club._id}`}>
                      <div>
                        <div className="team-section-card-title">
                          {club.name}
                        </div>
                      </div>
                    </Link>
                    <Link to={`${clubOrEdit}/${club._id}`}>
                      <img src={club.crest} alt="" className="card-img" />
                    </Link>
                    <div className="team-section-card-info">
                      <span className="team-section-card-county">
                        {club.county}
                      </span>
                      <span className="team-section-card-province">
                        {club.province}
                      </span>
                    </div>

                    {/* <div>
                      <Link to={`club/${club._id}#ticketButton`}>
                        <div className="ticket-wrapper">
                          <span className="ticket-button">GET TICKETS</span>
                        </div>
                      </Link>
                    </div> */}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
    //   )}
    // </div>
  );
};

export default AllTeams;
