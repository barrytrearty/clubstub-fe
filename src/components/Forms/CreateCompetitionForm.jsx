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
import "./forms.css";

const CreateCompetitionForm = ({ history }) => {
  const [show, setShow] = useState(false);

  const [imageFile, setImageFile] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [idForImage, setIdForImage] = useState();

  //Input
  const [description, setDescription] = useState();

  const apiUrl = "http://localhost:5000";
  const token = localStorage.getItem("accessToken");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageUpload = (e) => {
    if (e.target.files.length == 0) {
      console.log("No image selected!");
    } else {
      console.log(e.target.files[0]);
      setImageFile(e.target.files[0]);
      setImageUploaded(true);
    }
  };

  const postCompetition = async () => {
    const obj = {
      description,
      matches: [],
    };
    try {
      let response = await fetch(`http://localhost:5000/competitions`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let tokenObj = await response.json();
      if (response.ok) {
        console.log(tokenObj._id);
        console.log(obj);
        setIdForImage(tokenObj._id);
        handleShow();
      } else {
        console.log("Not groovy");
      }
    } catch (error) {
      console.log("Not fergilicious");
      console.log(error);
    }
  };

  const postImage = async () => {
    const formData = new FormData();
    formData.append("avatar", imageFile);

    console.log(formData);
    try {
      let response = await fetch(
        `${apiUrl}/competitions/${idForImage}/imageUpload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const reply = response.json();
        handleClose();
        history.push("/home");
        // setIsLoading(false);
        console.log(reply);
      } else {
        alert("Error! Please complete the form!");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postCompetition();
  };

  return (
    <div>
      <div id="create-form">
        <form action={handleShow}>
          <h2>Create a Competition</h2>

          <input
            type="text"
            placeholder="Description"
            id="step1"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleSubmit} id="step9">
            Create
          </Button>
          {/* <input type="submit" value="Create" id="step9" disabled /> */}
        </form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Match Image</Modal.Title>
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
    </div>
  );
};

export default withRouter(CreateCompetitionForm);
