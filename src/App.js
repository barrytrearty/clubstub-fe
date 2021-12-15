// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import bgImage from "../src/data/bg.PNG";
import Profile from "./components/Profile";
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import County from "./components/County";
import Club from "./components/Club";
import Match from "./components/Match";
import Account from "./components/Account";
import CubeHome from "./components/CubeHome";
import Competitions from "./components/Competitions";

function App() {
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
        <Route path="/cubeHome" component={CubeHome} />
        <Route path="/competitions" component={Competitions} />
        <Route path="/home" component={Home} />
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
