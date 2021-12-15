import { useState, useEffect } from "react";
import "swiper/swiper-bundle.css";
import Swiper from "swiper/swiper-bundle.esm.js";

// import { Swiper, SwiperSlide } from "swiper/react";
import "./cube.css";
import { Link, withRouter } from "react-router-dom";

const Cube = ({ array }) => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      effect: "cube",
      grabCursor: true,
      cubeEffect: {
        loop: true,
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  });

  // const swiper = new Swiper(".swiper", {
  //   effect: "cube",
  //   grabCursor: true,
  //   cubeEffect: {
  //     shadow: true,
  //     slideShadows: true,
  //     shadowOffset: 20,
  //     shadowScale: 0.94,
  //   },
  //   pagination: {
  //     el: ".swiper-pagination",
  //   },
  // });

  // const sectionStyle = {
  //   backgroundImage: `url(${match.image})`,
  // };

  return (
    <div className="swiper swiperCube">
      <div className="swiper-wrapper">
        {array.map((match) => (
          <div
            className="swiper-slide swiper-slideCube"
            style={{ backgroundImage: `url(${match.image})` }}
          >
            <div className="itemContainerCube">
              <div className="textContainerCube">
                <Link to={`match/${match._id}`}>
                  <h3>
                    <strong>
                      {match.homeTeam.name} vs {match.awayTeam.name}
                    </strong>
                  </h3>
                </Link>
                <Link to={`match/${match._id}`}>
                  <p>{match.description}</p>
                </Link>
                <Link to={`match/${match._id}#ticketButton`}>
                  <span className="ticket-button">GET TICKETS</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
  // return (
  //   <Swiper
  //     spaceBetween={50}
  //     slidesPerView={3}
  //     onSlideChange={() => console.log("slide change")}
  //     onSwiper={(swiper) => console.log(swiper)}
  //   >
  //     <SwiperSlide>Slide 1</SwiperSlide>
  //     <SwiperSlide>Slide 2</SwiperSlide>
  //     <SwiperSlide>Slide 3</SwiperSlide>
  //     <SwiperSlide>Slide 4</SwiperSlide>
  //     ...
  //   </Swiper>
  // );
};

export default Cube;
