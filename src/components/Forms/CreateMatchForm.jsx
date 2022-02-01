import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./forms.css";

const CreateMatchForm = ({ history }) => {
  const [show, setShow] = useState(false);

  const [comps, setComps] = useState([]);
  const [clubs, setClubs] = useState([]);

  const [imageFile, setImageFile] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [idForImage, setIdForImage] = useState();

  //Input
  const [competition, setCompetition] = useState("");
  const [description, setDescription] = useState();
  const [homeTeam, setHomeTeam] = useState();
  const [awayTeam, setAwayTeam] = useState();
  const [venue, setVenue] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [entryFee, setEntryFee] = useState();
  const [capacity, setCapacity] = useState();

  const apiUrl = process.env.REACT_APP_BE;
  const token = localStorage.getItem("accessToken");
  const id = useSelector((state) => state.userInfo._id);

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
      setComps(compsRes.slice(0, 3));
      // setLoading(false);
      console.log(comps);
      return compsRes;
    } catch (error) {
      console.log(error);
    }
  };

  const getClubs = async () => {
    try {
      let response = await fetch(`${apiUrl}/clubs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let clubsRes = await response.json();
      console.log(clubsRes);
      setClubs(clubsRes);
      // setLoading(false);
      console.log(clubs);
      return clubsRes;
    } catch (error) {
      console.log(error);
    }
  };

  const postMatch = async () => {
    const dateString = (
      date.toString().split("-") +
      "," +
      time.toString().split(":")
    ).split(",");
    const dateArray = dateString.map((string) => Number(string));
    // dateArray[1] = dateArray[1] + 1;
    dateArray[1]--;
    console.log(dateArray);
    const processDate = new Date(...dateArray);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const finalDate = processDate.toLocaleDateString("en-GB", options);

    const finalTime = processDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // const finalDate = new Date("2022, 02, 02, 22, 02");
    console.log(finalDate);

    const obj = {
      competition,
      description,
      homeTeam,
      awayTeam,
      venue,
      date,
      displayDate: finalDate,
      time: finalTime,
      entryFee,
      capacity,
      admin: id,
      createdOn: new Date(),
    };

    console.log(obj);
    try {
      let response = await fetch(`${apiUrl}/matches`, {
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
        `${apiUrl}/matches/${idForImage}/imageUpload`,
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
    postMatch();
  };

  useEffect(() => {
    if (document.getElementById("competition").value !== "") {
      document.getElementById("homeTeam").disabled = false;
    }
  }, [competition]);

  useEffect(() => {
    if (document.getElementById("homeTeam").value !== "") {
      document.getElementById("awayTeam").disabled = false;
    }
  }, [homeTeam]);

  useEffect(() => {
    if (document.getElementById("awayTeam").value !== "") {
      document.getElementById("description").disabled = false;
    }
  }, [awayTeam]);

  useEffect(() => {
    if (document.getElementById("description").value !== "") {
      document.getElementById("venue").disabled = false;
    }
  }, [description]);

  useEffect(() => {
    if (document.getElementById("venue").value !== "") {
      document.getElementById("date").disabled = false;
    }
  }, [venue]);

  useEffect(() => {
    if (document.getElementById("date").value !== "") {
      document.getElementById("time").disabled = false;
    }
  }, [date]);

  useEffect(() => {
    if (document.getElementById("time").value !== "") {
      document.getElementById("entryFee").disabled = false;
    }
  }, [time]);

  useEffect(() => {
    if (document.getElementById("entryFee").value !== "") {
      document.getElementById("capacity").disabled = false;
    }
  }, [entryFee]);

  useEffect(() => {
    if (document.getElementById("capacity").value !== "") {
      document.getElementById("step9").disabled = false;
    }
  }, [capacity]);

  useEffect(() => {
    getComps();
    getClubs();
  }, []);

  return (
    <div>
      <div id="create-form">
        <form action={handleShow}>
          <h2>Create an event</h2>
          <select
            name="competition"
            id="competition"
            onChange={(e) => setCompetition(e.target.value)}
          >
            <option value="">Competition</option>
            {comps.map((comp) => (
              <option value={comp._id}>{comp.description}</option>
            ))}
          </select>
          {/* <input
            type="text"
            placeholder="Competition"
            id="step0"
            onChange={(e) => setCompetition(e.target.value)}
          /> */}
          <select
            name="homeTeam"
            id="homeTeam"
            onChange={(e) => setHomeTeam(e.target.value)}
            disabled
          >
            <option value="">Home Team</option>
            {clubs.map((club) => (
              <option value={club._id}>{club.name}</option>
            ))}
          </select>
          <select
            name="awayTeam"
            id="awayTeam"
            onChange={(e) => setAwayTeam(e.target.value)}
            disabled
          >
            <option value="">Away Team</option>
            {clubs.map((club) => (
              <option value={club._id}>{club.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            disabled
          />

          {/* <input
            type="text"
            placeholder="Home"
            id="step2"
            onChange={(e) => setHomeTeam(e.target.value)}
            disabled
          />
          <input
            type="text"
            placeholder="Away"
            id="step3"
            onChange={(e) => setAwayTeam(e.target.value)}
            disabled
          /> */}
          <input
            type="text"
            placeholder="Venue"
            id="venue"
            onChange={(e) => setVenue(e.target.value)}
            disabled
          />
          <input
            type="date"
            placeholder="Date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
            disabled
          />
          <input
            type="time"
            placeholder="TIme"
            id="time"
            onChange={(e) => setTime(e.target.value)}
            disabled
          />
          <input
            type="number"
            min="0"
            placeholder="Entry Fee"
            id="entryFee"
            onChange={(e) => setEntryFee(e.target.value)}
            disabled
          />
          <input
            type="number"
            min="0"
            placeholder="Capacity"
            id="capacity"
            onChange={(e) => setCapacity(e.target.value)}
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
          <Modal.Title>Select Match Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div>Hello</div> */}

          <label
            for="file-upload"
            className="custom-file-upload py-2 fileLabel upload-button"
          >
            Select image
          </label>

          {imageUploaded ? (
            <label
              for="file-upload"
              className="custom-file-upload py-2 fileLabel save-button"
            >
              Uploaded
            </label>
          ) : (
            <label
              for="file-upload"
              className="custom-file-upload py-2 fileLabel cancel-button"
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
          <button className="cancel-button" onClick={handleClose}>
            Close
          </button>
          <button className="save-button" onClick={postImage}>
            Save Image
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withRouter(CreateMatchForm);
