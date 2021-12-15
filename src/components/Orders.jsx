import { Link, withRouter } from "react-router-dom";
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
  Image,
  Modal,
  Dropdown,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Login from "./Login";
import { AiTwotoneCalendar } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { AiOutlineClockCircle } from "react-icons/ai";

// import axios from "axios";
// import StripeCheckout from "react-stripe-checkout";
// import CheckoutForm from "./CheckoutForm";

const Orders = ({ match }) => {
  const id = useSelector((state) => state.userInfo._id);

  const apiUrl = "http://localhost:5000";
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramToken = params.get("accessToken");

    if (paramToken) {
      localStorage.setItem("accessToken", paramToken);
    }
    getOrders();
  }, []);

  return (
    <Container className="white-text">
      {orders.map((order) => (
        <Row id="event-card">
          <Col xs={12} sm={3}>
            {" "}
            <img src={order.match.image} alt="" className="eventImage" />
          </Col>
          <Col xs={12} sm={9}>
            <h3 className="username">{order.match.description}</h3>
            <div>
              <ImLocation /> {order.match.venue}
            </div>
            <div>
              <AiTwotoneCalendar /> {order.match.date}
            </div>
            <div>
              <AiOutlineClockCircle /> {order.match.time}
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Orders;
