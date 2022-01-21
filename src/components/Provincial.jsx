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
} from "react-bootstrap";
import CarouselCounty from "./Carousels/CarouselCounty";
import Login from "./Login";
import { useSelector } from "react-redux";

const Provincial = ({ competition }) => {
  const id = useSelector((state) => state.userInfo._id);
  // const competition = match.params.competition
  // const [matches, setMatches] = useState([]);
  const apiUrl = process.env.REACT_APP_PROD_BE;
  const [matches, setMatches] = useState([]);
  //   const [ulsterMatches, setUlsterMatches] = useState([]);
  //   const [leinsterMatches, setLeinsterMatches] = useState([]);
  //   const [munsterMatches, setMunsterMatches] = useState([]);
  //   const [connachtMatches, setConnachtMatches] = useState([]);
  //   const [counties, setCounties] = useState([]);
  const [loading2, setLoading2] = useState(true);

  const getMatches = async (compName) => {
    try {
      let response = await fetch(
        `${apiUrl}/matches/competition/${competition}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      let matchesRes = await response.json();
      console.log(matchesRes);
      setMatches(matchesRes);
      setLoading2(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  //   const getConnachtMatches = async (compName) => {
  //     try {
  //       let response = await fetch(
  //         `${apiUrl}/matches/competition/Connacht Championship`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             // Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       let matchesRes = await response.json();
  //       console.log(matchesRes);
  //       setConnachtMatches(matchesRes);
  //       // setLoading(false);
  //       // console.log(comps);
  //       return matchesRes;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getLeinsterMatches = async (compName) => {
  //     try {
  //       let response = await fetch(
  //         `${apiUrl}/matches/competition/Leinster Championship`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             // Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       let matchesRes = await response.json();
  //       console.log(matchesRes);
  //       setLeinsterMatches(matchesRes);
  //       // setLoading(false);
  //       // console.log(comps);
  //       return matchesRes;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getMunsterMatches = async (compName) => {
  //     try {
  //       let response = await fetch(
  //         `${apiUrl}/matches/competition/Munster Championship`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             // Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       let matchesRes = await response.json();
  //       console.log(matchesRes);
  //       setMunsterMatches(matchesRes);
  //       // setLoading(false);
  //       // console.log(comps);
  //       return matchesRes;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getCounties = async () => {
  //     try {
  //       let response = await fetch(`${apiUrl}/counties`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       let countiesRes = await response.json();
  //       console.log(countiesRes);
  //       setCounties(countiesRes);
  //       setLoading(false);
  //       console.log(counties);
  //       return countiesRes;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getAllComps = () => {
  //     getUlsterMatches();
  //     getLeinsterMatches();
  //     getConnachtMatches();
  //     getMunsterMatches();
  //   };

  useEffect(() => {
    getMatches();
    // getCounties();
  }, []);

  return (
    <div>
      {id === "" ? (
        <Login />
      ) : (
        <div>
          {loading2 ? (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              <div>
                <h4>{competition}</h4>
                {matches.map((match) => {
                  <div>
                    {" "}
                    <div>{match.time}</div>
                    <div>{match.date}</div>
                    <div>{match.venue}</div>
                    {/* <div>{match.homeTeam}</div>
                    <div>{match.awayTeam}</div> */}
                  </div>;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Provincial;
