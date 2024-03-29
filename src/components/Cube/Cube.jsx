import { useState, useEffect, useRef } from "react";
import "swiper/swiper-bundle.css";
import Swiper from "swiper/swiper-bundle.esm.js";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

// import { Swiper, SwiperSlide } from "swiper/react";
import "./cube.css";
import { withRouter } from "react-router-dom";

const Cube = ({ history }) => {
  const [searchInput, setSearchInput] = useState("");

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

  // const cubeJS = document.getElementsByClassName("swiperCube");
  // console.log(cubeJS);
  // cubeJS.addEventListener("mousedown", (cubeJS.style.zIndex = "10"));

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

  const firstCube = useRef();
  const cubeHeading = useRef();

  const useSearchBar = () => {
    history.push(`/search?query=${searchInput}`);
  };

  useEffect(() => {
    // document.getElementById("leadTextContainerCube").style.opacity = 1;
    // document.getElementById("odHead").style.opacity = 1;
    firstCube.current.style.opacity = 1;
    cubeHeading.current.style.opacity = 1;
  }, []);

  return (
    <div className="swiper swiperCube">
      <div className="swiper-wrapper">
        <div
          className="swiper-slide swiper-slideCube"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/btrearty/image/upload/v1639050927/matches/move_qengv8.jpg)`,
          }}
        >
          <div className="itemContainerCube">
            <div id="leadTextContainerCube" ref={firstCube}>
              <h1>
                Welcome to{" "}
                <span id="odHead" ref={cubeHeading}>
                  O'Deals
                </span>
              </h1>
              <div className="mb-3" id="inputGroup">
                <input
                  id="formSearch"
                  placeholder="Search matches"
                  aria-label="Search matches"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button onClick={useSearchBar}>
                  <BsSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="swiper-slide swiper-slideCube"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/btrearty/image/upload/v1638882013/matches/tackle_q5i9mi.jpg)`,
          }}
        >
          <div className="itemContainerCube">
            <div class="textContainerCube">
              <h1>
                A <span>Hub</span> for <span>Stubs</span>
              </h1>
            </div>
          </div>
        </div>
        <div
          className="swiper-slide swiper-slideCube"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/btrearty/image/upload/v1638881993/matches/block_ps8wbq.jpg)`,
          }}
        >
          <div className="itemContainerCube">
            <div class="textContainerCube">
              <h1>
                The first <span>Pick</span> for <span>Tickets</span>
              </h1>
            </div>
          </div>
        </div>
        <div
          className="swiper-slide swiper-slideCube"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/btrearty/image/upload/v1638882013/matches/protect_lk2yjy.jpg)`,
          }}
        >
          <div className="itemContainerCube">
            <div class="textContainerCube">
              <h1>
                Putting the <span>G</span> in <span>GAA</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="swiper-button-next whiteArrow"></div>
      <div className="swiper-button-prev whiteArrow"></div>
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

export default withRouter(Cube);
