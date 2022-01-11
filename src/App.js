// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
// import bgImage from "../src/data/bg.PNG";
import Profile from "./components/Profiles/Profile";
import MyProfile from "./components/Profiles/MyProfile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Views/Home";
import County from "./components/Views/County";
import Club from "./components/Views/Club";
import Match from "./components/Match";
import Account from "./components/Views/Account";
// import CubeHome from "./components/Cube/CubeHome";
import Competitions from "./components/Competitions";
import AddEvent from "./components/AddEvent";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.style = "background: linear-gradient(#0b2122, #03160e);";
  }, []);

  useEffect(() => {
    const main = document.getElementById("home-container");
    const nav = document.getElementById("club-nav-container");

    let offset = window.innerHeight - nav.offsetHeight;

    window.onscroll = function () {
      if (window.pageYOffset > offset) {
        nav.classList.remove("bottom-nav");
        nav.classList.add("top-nav");
      }
    };
  }, []);

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
        <Route path="/competitions" component={Competitions} />
        <Route path="/home" component={Home} />
        <Route path="/addEvent" component={AddEvent} />
        <Route path="/match/:id" component={Match} />
        {/*  <Route path="/checkout" component={Checkout} /> */}
        <Route path="/county/:id" component={County} />
        <Route path="/club/:id" component={Club} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/orders" component={Account} />
      </div>
    </Router>
  );
}

export default App;
