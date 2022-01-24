import { useState, useEffect } from "react";
import {
  Col,
  Row,

  Spinner,

} from "react-bootstrap";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { TiPlusOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { BsCalendarCheck } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";

const AllMatches = () => {
  const id = useSelector((state) => state.userInfo._id);
  const isAdmin = useSelector((state) => state.userInfo.role);
  let matchOrEdit = isAdmin === "Admin" ? "editMatch" : "match";

  const [matches, setMatches] = useState([]);

  const apiUrl = process.env.REACT_APP_BE;
  const [comps, setComps] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMatches = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let matchesRes = await response.json();
      console.log(matchesRes);
      setMatches(matchesRes);
      setLoading(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getComps = async () => {
    try {
      let response = await fetch(`${apiUrl}/competitions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let compsRes = await response.json();
      console.log(compsRes);
      setComps(compsRes);
      // setLoading(false);
      console.log(comps);
      return compsRes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
    getComps();
    // getClubs();
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
        <div>
          <div class="card-section afterNavbar">
            <div>
              <h3 className="home-heading">Competitions</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {isAdmin === "Admin" ? (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Link to="/addComp">
                    <div className="addNew">
                      <TiPlusOutline className="plus" />
                      <div>Add Competition</div>
                    </div>
                  </Link>
                </Col>
              ) : (
                ""
              )}

              {comps.map((comp) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="card-section-card">
                    {/* <Link to={`/${comp._id}`}> */}
                    <img src={comp.image} alt="" className="card-img" />
                    {/* </Link> */}
                    {/* <Link to={`${matchOrEdit}/${match._id}`}> */}
                    <div>
                      <div className="comp-section-card-title">
                        {comp.description}
                      </div>
                      {/* <div>{comp.description}</div> */}
                    </div>
                    {/* </Link> */}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div class="card-section">
            <div>
              <h3 className="home-heading">Matches</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {isAdmin === "Admin" ? (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Link to="/addMatch">
                    <div className="addNew">
                      <TiPlusOutline className="plus" />
                      <div>Add Match</div>
                    </div>
                  </Link>
                </Col>
              ) : (
                ""
              )}
              {matches.map((match) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="card-section-card">
                    <Link to={`${matchOrEdit}/${match._id}`}>
                      <img src={match.image} alt="" className="card-img" />
                    </Link>
                    <Link to={`${matchOrEdit}/${match._id}`}>
                      <div className="card-section-card-info">
                        <div className="card-section-card-title">
                          {match.competition.description} {match.description}
                        </div>
                        <div className="card-section-card-teams">
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </div>

                        <div>
                          <FiMapPin /> {match.venue}
                        </div>
                        <div>
                          <BsCalendarCheck /> {match.displayDate}
                        </div>
                        <div>
                          <BiTimeFive /> {match.time}
                        </div>
                        <div className="card-section-card-price">
                          €{match.entryFee}.00
                        </div>
                      </div>
                    </Link>
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

export default AllMatches;
