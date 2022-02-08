import "./footer.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className="footerCont">
        <h3>About author</h3>
        <div class="footer-text-container">
          <div id="footer-image-div">
            {" "}
            <img
              src="https://res.cloudinary.com/btrearty/image/upload/v1643646515/avatar/IMG_3127-removebg-preview_m2eqzh.png"
              alt=""
            />
          </div>

          <div id="footer-info-div" className="mt-4">
            <p>My name is Barry and I am a graduate of Strive School. </p>
            <p>
              I am a Fullstack developer centered on the MERN stack with a
              special focus on the frontend.
            </p>
            <p>
              This site is a prototype site for a GAA ticket vendor. It was
              built using React, Redux, node.js, Express and MongoDB
            </p>
            <p>
              Feel free to check out my github and portfolio and don't hesitate
              to get in touch. Thank you
            </p>
          </div>
          <div id="footer-icons-div">
            <span>
              <a
                href="https://www.linkedin.com/in/barry-trearty"
                target="_blank"
                id="linkedin"
              >
                <BsLinkedin />
              </a>
            </span>
            <span>
              <a
                href="https://github.com/barrytrearty"
                target="_blank"
                id="github"
              >
                <BsGithub />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
