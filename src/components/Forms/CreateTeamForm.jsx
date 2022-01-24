import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import "./forms.css";

const CreateTeamForm = ({ history }) => {
  const [show, setShow] = useState(false);

  const [imageFile, setImageFile] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [idForImage, setIdForImage] = useState();

  //Input
  const [name, setName] = useState();
  const [province, setProvince] = useState();
  const [county, setCounty] = useState();

  const apiUrl = process.env.REACT_APP_BE;
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

  const postMatch = async () => {
    const obj = {
      name,
      county,
      province,
    };
    try {
      let response = await fetch(`${apiUrl}/clubs`, {
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
      let response = await fetch(`${apiUrl}/clubs/${idForImage}/imageUpload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    postMatch();
  };

  useEffect(() => {
    if (document.getElementById("step0").value !== "") {
      document.getElementById("step1").disabled = false;
    }
  }, [name]);

  useEffect(() => {
    if (document.getElementById("step1").value !== "") {
      document.getElementById("step2").disabled = false;
    }
  }, [province]);

  // useEffect(() => {
  //   if (document.getElementById("step2").value !== "") {
  //     document.getElementById("step3").disabled = false;
  //   }
  // }, [county]);

  return (
    <div>
      <div id="create-form">
        <form action={handleShow}>
          <h2>Add Team</h2>
          <input
            type="text"
            placeholder="Name"
            id="step0"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Province"
            id="step1"
            onChange={(e) => setProvince(e.target.value)}
          />
          <input
            type="text"
            placeholder="County"
            id="step2"
            onChange={(e) => setCounty(e.target.value)}
            disabled
          />

          <Button onClick={handleSubmit} id="step9">
            Create
          </Button>
          {/* <input type="submit" value="Create" id="step9" disabled /> */}
        </form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Team Crest</Modal.Title>
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
    </div>
  );
};

export default withRouter(CreateTeamForm);
