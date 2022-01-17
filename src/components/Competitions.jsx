// import Cube from "./Cube";
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
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Competitions = () => {
  const id = useSelector((state) => state.userInfo._id);

  const [matches, setMatches] = useState([]);
  const apiUrl = "http://localhost:5000";
  const [counties, setCounties] = useState([]);
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
      setMatches(matchesRes.slice(0, 6));
      // setLoading(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  // const getComps = async () => {
  //   try {
  //     let response = await fetch(`${apiUrl}/matches`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     let matchesRes = await response.json();
  //     console.log(matchesRes);
  //     setMatches(matchesRes.slice(0, 6));
  //     // setLoading(false);
  //     console.log(matches);
  //     return matchesRes;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      setLoading(false);
      console.log(counties);
      return countiesRes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
    getCounties();
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
          <Row className="pb-5"></Row>
          <CarouselCounty array={counties} />
        </div>
      )}
    </div>
    //   )}
    // </div>
  );
};

export default Competitions;
