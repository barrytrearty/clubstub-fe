import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./forms.css";

const EditMatchForm = ({ match, history }) => {
  const [show, setShow] = useState(false);

  const [comps, setComps] = useState([]);
  const [clubs, setClubs] = useState([]);

  const [imageFile, setImageFile] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [idForImage, setIdForImage] = useState();

  //Input
  //   const [matchObj, setMatchobj] = useState();
  const [competitionValue, setCompetitionValue] = useState("");
  const [description, setDescription] = useState();
  const [homeTeamValue, setHomeTeamValue] = useState();
  const [awayTeamValue, setAwayTeamValue] = useState();
  const [competitionName, setCompetitionName] = useState("");
  const [homeTeamName, setHomeTeamName] = useState();
  const [awayTeamName, setAwayTeamName] = useState();
  const [venue, setVenue] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [entryFee, setEntryFee] = useState();
  const [capacity, setCapacity] = useState();

  const apiUrl = process.env.REACT_APP_BE;
  const token = localStorage.getItem("accessToken");
  const userId = useSelector((state) => state.userInfo._id);

  const { matchId } = match.params;

  const handleClose = () => {
    setShow(false);
    history.push("/home");
  };
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

  const getMatch = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches/${matchId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let matchRes = await response.json();
      console.log(matchRes);
      //   setMatchobj(matchRes);
      setCompetitionValue(matchRes.competition._id);
      setCompetitionName(matchRes.competition.description);
      setDescription(matchRes.description);
      setHomeTeamName(matchRes.homeTeam.name);
      setAwayTeamName(matchRes.awayTeam.name);
      setHomeTeamValue(matchRes.homeTeam._id);
      setAwayTeamValue(matchRes.awayTeam._id);
      setVenue(matchRes.venue);
      setDate(matchRes.date);
      setTime(matchRes.time);
      setEntryFee(matchRes.entryFee);
      setCapacity(matchRes.capacity);
      //   setLoading(false);
      //   console.log(matchObj);
      return matchRes;
    } catch (error) {
      console.log(error);
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
      //   setLoading(false);
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
      competition: competitionValue,
      description,
      homeTeam: homeTeamValue,
      awayTeam: awayTeamValue,
      venue,
      date,
      displayDate: finalDate,
      time: finalTime,
      entryFee,
      capacity,
      admin: userId,
      createdOn: new Date(),
    };

    console.log(obj);
    try {
      let response = await fetch(`${apiUrl}/matches/${matchId}`, {
        method: "PUT",
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

  //   useEffect(() => {
  //     if (document.getElementById("competition").value !== "") {
  //       document.getElementById("homeTeam").disabled = false;
  //     }
  //   }, [competition]);

  //   useEffect(() => {
  //     if (document.getElementById("homeTeam").value !== "") {
  //       document.getElementById("awayTeam").disabled = false;
  //     }
  //   }, [homeTeam]);

  //   useEffect(() => {
  //     if (document.getElementById("awayTeam").value !== "") {
  //       document.getElementById("description").disabled = false;
  //     }
  //   }, [awayTeam]);

  //   useEffect(() => {
  //     if (document.getElementById("description").value !== "") {
  //       document.getElementById("venue").disabled = false;
  //     }
  //   }, [description]);

  //   useEffect(() => {
  //     if (document.getElementById("venue").value !== "") {
  //       document.getElementById("date").disabled = false;
  //     }
  //   }, [venue]);

  //   useEffect(() => {
  //     if (document.getElementById("date").value !== "") {
  //       document.getElementById("time").disabled = false;
  //     }
  //   }, [date]);

  //   useEffect(() => {
  //     if (document.getElementById("time").value !== "") {
  //       document.getElementById("entryFee").disabled = false;
  //     }
  //   }, [time]);

  //   useEffect(() => {
  //     if (document.getElementById("entryFee").value !== "") {
  //       document.getElementById("capacity").disabled = false;
  //     }
  //   }, [entryFee]);

  //   useEffect(() => {
  //     if (document.getElementById("capacity").value !== "") {
  //       document.getElementById("step9").disabled = false;
  //     }
  //   }, [capacity]);

  useEffect(() => {
    getMatch();
    getComps();
    getClubs();
  }, []);

  return (
    <div>
      <div id="create-form">
        <form action={handleShow}>
          <h2>Edit event</h2>
          <select
            name="competition"
            id="competition"
            defaultValue={competitionValue}
            onChange={(e) => setCompetitionValue(e.target.value)}
          >
            <option value={competitionValue}>{competitionName}</option>
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
            defaultValue={homeTeamValue}
            onChange={(e) => setHomeTeamValue(e.target.value)}
          >
            <option value={homeTeamValue}>{homeTeamName}</option>
            {clubs.map((club) => (
              <option value={club._id}>{club.name}</option>
            ))}
          </select>
          <select
            name="awayTeam"
            id="awayTeam"
            defaultValue={awayTeamValue}
            onChange={(e) => setAwayTeamValue(e.target.value)}
          >
            <option value={awayTeamValue}>{awayTeamName}</option>
            {clubs.map((club) => (
              <option value={club._id}>{club.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            id="description"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* <input
            type="text"
            placeholder="Home"
            id="step2"
            onChange={(e) => setHomeTeam(e.target.value)}
            
          />
          <input
            type="text"
            placeholder="Away"
            id="step3"
            onChange={(e) => setAwayTeam(e.target.value)}
            
          /> */}
          <input
            type="text"
            // placeholder="Venue"
            id="venue"
            defaultValue={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
          <input
            type="date"
            // placeholder="Date"
            id="date"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="TIme"
            id="time"
            defaultValue={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Entry Fee"
            id="entryFee"
            defaultValue={entryFee}
            onChange={(e) => setEntryFee(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Capacity"
            id="capacity"
            defaultValue={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <Button onClick={handleSubmit} id="step9">
            Update
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
            Select new photo
          </label>

          {imageUploaded ? (
            <label
              for="file-upload"
              className="custom-file-upload py-2 fileLabel save-button"
            >
              Updated
            </label>
          ) : (
            <label
              for="file-upload"
              className="custom-file-upload py-2 fileLabel cancel-button"
            >
              Not updated
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

export default withRouter(EditMatchForm);
