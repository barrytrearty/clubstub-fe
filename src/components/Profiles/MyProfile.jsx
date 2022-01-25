import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Modal,
  CloseButton,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { setUserInfo } from "../../redux/actions/actions.js";
import { setUserInfo } from "../../redux/actions/actions.js";
// import PeopleSection from "./PeopleSection";
import { Link } from "react-router-dom";

import Orders from "../Orders.jsx";

const MyProfile = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [comps, setComps] = useState([]);
  const [matches, setMatches] = useState([]);

  const [imageFile, setImageFile] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const apiUrl = process.env.REACT_APP_BE;
  const token = localStorage.getItem("accessToken");

  const getProfile = async () => {
    try {
      let response = await fetch(`${apiUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let userRes = await response.json();
      console.log(userRes);
      setUser(userRes);
      dispatch(setUserInfo(userRes));
      setLoading(false);

      return userRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getMatches = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let matchesRes = await response.json();
      console.log(matchesRes);
      setMatches(matchesRes);
      setLoading(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  const imageUpload = (e) => {
    if (e.target.files.length == 0) {
      console.log("No image selected!");
    } else {
      setImageFile(e.target.files[0]);

      setImageUploaded(true);
    }
  };

  const getComps = async () => {
    try {
      let response = await fetch(`${apiUrl}/competitions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let compsRes = await response.json();
      console.log(compsRes);
      setComps(compsRes);
      // setLoading(false);
      console.log(comps);
      return compsRes;
    } catch (error) {
      console.log(error);
    }
  };

  const postImage = async () => {
    const formData = new FormData();
    formData.append("avatar", imageFile);

    console.log(formData);
    try {
      let response = await fetch(`${apiUrl}/users/me/picture`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const reply = response.json();
        handleClose();
        // setIsLoading(false);
        console.log(reply);
      } else {
        alert("Error! Please complete the form!");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramToken = params.get("accessToken");

    if (paramToken) {
      localStorage.setItem("accessToken", paramToken);
    }
    getProfile();

    // dispatch(setUserInfo(user));
  }, []);

  useEffect(() => {
    getComps();
    getMatches();
    getProfile();
    // getComps();
  }, [show]);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container className="afterNavbar">
          <div className="profileTopCard topmargin px-0">
            <Row>
              <Col xs={12} md={3}>
                {" "}
                <div
                  id="county-card"
                  className="mt-5"
                  style={{ borderRadius: "8px" }}
                >
                  <img className="profileImageUser" src={user.picture} alt="" />
                  <div className="mb-0 font-weight-bold username">
                    {user.username}
                  </div>

                  <div className="ticket-wrapper">
                    <button className="ticket-button" onClick={handleShow}>
                      Change Picture
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <h5>Competitions</h5>
                  {comps.map((comp) => (
                    <Link to={`/matches`}>
                      <div className="card-section-card">
                        <img src={comp.image} alt="" className="card-img" />
                        {/* </Link> */}
                        {/* <Link to={`${matchOrEdit}/${match._id}`}> */}
                        <div>
                          <div className="comp-section-card-title">
                            {comp.description}
                          </div>
                          {/* <div>{comp.description}</div> */}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Col>
              <Col xs={12} md={9} className="mt-5">
                <Orders />
              </Col>
            </Row>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Select Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label
                for="file-upload"
                className="custom-file-upload py-2 fileLabel"
              >
                Select image
              </label>

              {imageUploaded ? (
                <label
                  for="file-upload"
                  className="custom-file-upload py-2 fileLabel fileSuccess"
                >
                  Uploaded
                </label>
              ) : (
                <label
                  for="file-upload"
                  className="custom-file-upload py-2 fileLabel fileFail"
                >
                  Not uploaded
                </label>
              )}
              <input
                className="d-none"
                id="file-upload"
                type="file"
                onChange={(e) => imageUpload(e)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={postImage}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </div>
  );
};

export default MyProfile;
