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
// import "swiper/swiper-bundle.css";
import "./carousel.css";
import { Link, withRouter } from "react-router-dom";

const CarouselClub = ({ array }) => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 8,
    spaceBetween: 10,
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  return (
    <div class="swiper swiperCarousel">
      <div class="swiper-wrapper swiper-wrapper-club">
        {array.map((club) => (
          <div class="swiper-slide swiper-slideCarousel">
            <Link to={`/club/${club._id}`} replace className="crest">
              <img src={club.crest} alt="" />
            </Link>
          </div>
        ))}
      </div>

      {/* <div class="swiper-pagination"></div> */}

      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  );
};

export default CarouselClub;
