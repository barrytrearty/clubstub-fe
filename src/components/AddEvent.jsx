import { Link, withRouter } from "react-router-dom";
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
  Image,
  Modal,
  Dropdown,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";

const AddEvent = () => {
  const [show, setShow] = useState(false);

  const [imageFile, setImageFile] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);

  const apiUrl = "http://localhost:5000";
  const token = localStorage.getItem("accessToken");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <Container className="login">
      <Row>
        <Col
          xs="12"
          className="mx-auto text-dark p-5 d-flex flex-column justify-content-center align-items-center"
        >
          <Card className="p-3">
            <h1 className="font-weight-bold">Create new event</h1>
            <InputGroup className="my-3 d-flex flex-column justify-content-center align-items-center w-100">
              <div className="mt-1">Time</div>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                className="w-100"
              />
              <div className="mt-3">Date</div>
              <FormControl
                className="w-100"
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
              />
              <div className="mt-3">Venue</div>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                className="w-100"
              />
              <div className="mt-3">Competition</div>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                className="w-100"
              />
              <div className="mt-3">Entry Fee</div>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                className="w-100"
              />
              <div className="mt-3">Home</div>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                className="w-100"
              />
              <div className="mt-3">Away</div>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                className="w-100"
              />
            </InputGroup>{" "}
            <Button onClick={handleShow} variant="primary">
              Match Picture
            </Button>
            <Button variant="success">Add Event</Button>
            {/* <a href={`http://localhost:5000/users/googleLogin`}> */}
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="file-upload" className="custom-file-upload py-2">
            Select image
          </label>
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
  );
};

export default withRouter(AddEvent);
