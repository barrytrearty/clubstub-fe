import Swiper from "swiper/swiper-bundle.esm.js";
// import "swiper/swiper-bundle.css";
import "./carousel.css";
import { Link, withRouter } from "react-router-dom";

const CarouselCounty = ({ array }) => {
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
      <div class="swiper-wrapper">
        {array.map((county) => (
          <div class="swiper-slide swiper-slideCarousel">
            {/* <h3>{county.name}</h3> */}
            <Link to={`county/${county.name}`} className="crest">
              <img src={county.crest} alt="" className="county-crest" />
              {/* <h5>{county.name}</h5> */}
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

export default CarouselCounty;
