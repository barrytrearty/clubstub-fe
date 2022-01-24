import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AiTwotoneCalendar } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { AiOutlineClockCircle } from "react-icons/ai";
// import axios from "axios";
// import StripeCheckout from "react-stripe-checkout";
// import CheckoutForm from "./CheckoutForm";

const Account = ({ match }) => {
  const id = useSelector((state) => state.userInfo._id);
  const isAdmin = useSelector((state) => state.userInfo.role);

  const apiUrl = process.env.REACT_APP_BE;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  const getOrders = async () => {
    try {
      let response = await fetch(`${apiUrl}/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let ordersRes = await response.json();
      console.log(ordersRes);
      setOrders(ordersRes);
      setLoading(false);
      console.log(orders);
      return ordersRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminMatches = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches/admin/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let ordersRes = await response.json();
      console.log(ordersRes);
      setOrders(ordersRes);
      setLoading(false);
      console.log(orders);
      return ordersRes;
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
    isAdmin ? getAdminMatches() : getOrders();
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
        <Container className="white-text mt-5 pb-5">
          {orders.map((order) => (
            <Row id="event-card">
              <Col xs={2}>
                {" "}
                <img src={order.match.image} alt="" className="eventImage" />
              </Col>
              <Col xs={10}>
                <h3 className="username">{order.match.description}</h3>
                <div>
                  <ImLocation /> {order.match.venue}
                </div>
                <div>
                  <AiTwotoneCalendar /> {order.match.displayDate}{" "}
                  <AiOutlineClockCircle /> {order.match.time}
                </div>
                <div>Number of tickets: {order.numberOfTickets}</div>
              </Col>
            </Row>
          ))}
        </Container>
      )}
    </div>
    //   )}
    // </div>
  );
};

export default Account;
