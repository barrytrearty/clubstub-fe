import { useState, useEffect } from "react";
import { Col, FormControl, InputGroup, Row, Spinner } from "react-bootstrap";
// import CarouselCounty from "../Carousels/CarouselCounty";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import "./Manage.css";
import { TiPlusOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { BsCalendarCheck } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
// import { BsSearch } from "react-icons/bs";

const SearchMatches = () => {
  let params = new URLSearchParams(document.location.search);
  const searchQuery = params.get("query");
  const id = useSelector((state) => state.userInfo._id);
  const isAdmin = useSelector((state) => state.userInfo.role);
  let matchOrEdit = isAdmin === "Admin" ? "editMatch" : "match";

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [matches, setMatches] = useState([]);
  const apiUrl = process.env.REACT_APP_BE;
  const [comps, setComps] = useState([]);
  //   const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMatches = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches/search/${searchInput}`, {
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

  //   const getComps = async () => {
  //     try {
  //       let response = await fetch(`${apiUrl}/competitions`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       let compsRes = await response.json();
  //       console.log(compsRes);
  //       setComps(compsRes);
  //       // setLoading(false);
  //       console.log(comps);
  //       return compsRes;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    getMatches();
    // getComps();
    // getClubs();
  }, []);

  useEffect(() => {
    getMatches();
    // getComps();
    // getClubs();
  }, [searchInput]);

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
          <InputGroup className="mb-3 afterNavbar" id="inputGroup">
            <FormControl
              placeholder="Search matches"
              aria-label="Search matches"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {/* <Button variant="outline-success" id="button-addon2">
              <BsSearch />
            </Button> */}
          </InputGroup>
          {/* <div class="card-section">
            <div>
              <h3 className="home-heading">Competitions</h3>
            </div>
            <Row className="mb-3 ml-1 mr-1">
              {comps.map((comp) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="card-section-card">
                    <img src={comp.image} alt="" className="card-img" />

                    <div>
                      <div className="comp-section-card-title">
                        {comp.description}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div> */}
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

export default SearchMatches;
