// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
// import bgImage from "../src/data/bg.PNG";
import Profile from "./components/Profiles/Profile";
import MyProfile from "./components/Profiles/MyProfile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import County from "./components/Views/County";
import Club from "./components/Views/Club";
import Match from "./components/Match/Match";
import SingleOrder from "./components/SingleOrder/SingleOrder";

import AllTeams from "./components/AllTeams/AllTeams";
import AllMatches from "./components/AllMatches/AllMatches";
import SearchMatches from "./components/SearchMatches/SearchMatches";
import CreateMatchForm from "./components/Forms/CreateMatchForm";
import EditMatchForm from "./components/Forms/EditMatchForm";
import CreateCompetitionForm from "./components/Forms/CreateCompetitionForm";
import CreateTeamForm from "./components/Forms/CreateTeamForm";
import EditMatch from "./components/Match/EditMatch";

// import AddEvent from "./components/AddEvent";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.style = "  background: rgb(255, 255, 255);";
  }, []);

  // useEffect(() => {
  //   const main = document.getElementById("home-container");
  //   const nav = document.getElementById("club-nav-container");

  //   let offset = window.innerHeight - nav.offsetHeight;

  //   if (window.location.pathname === "/home") {
  //     window.onscroll = function () {
  //       if (window.pageYOffset > offset) {
  //         nav.classList.remove("bottom-nav");
  //         nav.classList.add("top-nav");
  //         console.log(window.location.pathname);
  //       }
  //     };
  //   } else {
  //     nav.classList.remove("bottom-nav");
  //     nav.classList.add("top-nav");
  //   }
  // }, []);

  return (
    <Router className="App">
      <Navbar />

      <div className="blackBody">
        <Route exact path="/">
          {<Redirect to="/home" />}
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/me" component={MyProfile} />
        {/* <Route path="/cubeHome" component={CubeHome} /> */}
        <Route path="/teams" component={AllTeams} />
        <Route path="/matches" component={AllMatches} />
        <Route path="/search" component={SearchMatches} />
        <Route path="/home" component={Home} />
        <Route path="/addMatch" component={CreateMatchForm} />
        <Route path="/editMatchForm/:matchId" component={EditMatchForm} />
        <Route path="/addComp" component={CreateCompetitionForm} />
        <Route path="/addTeam" component={CreateTeamForm} />

        <Route path="/match/:id" component={Match} />
        <Route path="/order/:id" component={SingleOrder} />
        <Route path="/editMatch/:id" component={EditMatch} />
        {/*  <Route path="/checkout" component={Checkout} /> */}
        <Route path="/county/:id" component={County} />
        <Route path="/club/:id" component={Club} />
        <Route path="/profile/:id" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
