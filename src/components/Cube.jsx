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
import Swiper from "swiper/swiper-bundle.esm.js";
import "swiper/swiper-bundle.css";
import "./cube.css";
import { Link, withRouter } from "react-router-dom";

const Cube = ({ array }) => {
  const swiper = new Swiper(".swiper", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  return (
    <div class="swiper">
      <div class="swiper-wrapper">
        {/* {array.map((club) => (
          <div class="swiper-slide">
            <a
              href={`http://localhost:3000/club/${club._id}`}
              className="crest"
            >
              <img src={club.crest} alt="" />
            </a>
          </div>
        ))} */}
        <div class="swiper-slide slide1"></div>
        <div class="swiper-slide slide1"></div>
        <div class="swiper-slide slide1"></div>
      </div>
      {/* <div class="swiper-pagination"></div> */}

      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  );
};

export default Cube;
