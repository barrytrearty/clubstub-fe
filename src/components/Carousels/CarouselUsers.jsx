import "./carousel.css";
import Swiper from "swiper/swiper-bundle.esm.js";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";

const CarouselUsers = ({ array }) => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    slidesPerGroup: 3,
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
    <div id="user-carousel" class="swiper swiperCarousel">
      <div class="swiper-wrapper">
        {array.map((user) => (
          <div class="swiper-slide swiper-slideCarousel">
            <Link to={`/profile/${user._id}`} replace>
              <img src={user.picture} alt="" className="follower-image" />
              <div>{user.username}</div>
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

export default CarouselUsers;
