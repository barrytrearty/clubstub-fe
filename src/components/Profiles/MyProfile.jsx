import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Card,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { setUserInfo } from "../../redux/actions/actions.js";
import { setUserInfo } from "../../redux/actions/actions.js";
// import PeopleSection from "./PeopleSection";
import { Link, withRouter } from "react-router-dom";

import Orders from "../Orders.jsx";

const MyProfile = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [imageFile, setImageFile] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const apiUrl = "http://localhost:5000";
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

  const imageUpload = (e) => {
    if (e.target.files.length == 0) {
      console.log("No image selected!");
    } else {
      setImageFile(e.target.files[0]);

      setImageUploaded(true);
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
    getProfile();
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
              <Col xs={3}>
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
                  <div className="mb-0">Donegal</div>
                  {/* <div>
                    <span className="mr-1">Followers</span>
                    <span className="mr-1">Following</span>
                  </div> */}

                  <div className="ticket-wrapper">
                    <div
                      className="messagebutton ticket-button match-text"
                      onClick={handleShow}
                    >
                      Edit Profile
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={9} className="mt-5">
                <h2>Upcoming Events</h2>
                <Orders />
                {/* <Card
                  style={{
                    borderRadius: "8px",
                  }}
                  className="mt-5"
                >
                  <Card.Body className="py-4">
                    <Card.Title class="sectionheader pb-3">
                      Upcoming Events
                    </Card.Title>
                    <Card.Text class="sectiontext mb-0">None to show</Card.Text>
                  </Card.Body>
                </Card> */}
              </Col>
            </Row>
          </div>

          {/* <Card
            style={{
              borderRadius: "8px",
            }}
            className="mb-3"
          >
            <Card.Body className="py-4">
              <Card.Title class="sectionheader pb-3">
                Carousel with Club/County Teams
              </Card.Title>
              <Card.Text class="sectiontext mb-0">None to show</Card.Text>
            </Card.Body>
          </Card> */}

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
