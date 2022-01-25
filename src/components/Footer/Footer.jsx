import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footerCont">
        <h3>About author</h3>
        <div class="footer-text-container">
          <img
            src="https://res.cloudinary.com/btrearty/image/upload/v1634040287/linked-products/u31qfd3uhxobmzxozubf.jpg"
            alt=""
          />
          <div>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
