import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import GoogleAuth from "./containers/GoogleAuth";
import RegisterForm from "./containers/RegisterForm";
import Rocks from "./containers/Rocks";
import Boulder from "./containers/Boulder";
import Path from "./containers/Path";
import Requests from "./containers/Requests";
import CompletedClimbs from "./containers/CompletedClimbs";
import MapPage from "./containers/MapPage";
import NavBar from "./components/NavigationBar";
import EditPath from "./containers/EditPath";
import AdminLeaderboard from "./containers/AdminLeaderboard";
import AdminSingleUserCompletedClimbs from "./containers/AdminSingleUserCompletedClimbs";
import MyProfile from "./containers/MyProfile";
import EditMyProfile from "./containers/EditMyProfile";
import AdminEvent from "./containers/AdminEvent";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/googleauth" exact component={GoogleAuth} />
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/rocks" exact component={Rocks} />
        <Route path="/rocks/:boulder" exact component={Boulder} />
        <Route path="/path/:path" exact component={Path} />
        <Route path="/path/edit/:path" exact component={EditPath} />
        <Route path="/requests" exact component={Requests} />
        <Route path="/completed_climbs" exact component={CompletedClimbs} />
        <Route path="/map" exact component={MapPage} />
        <Route path="/admin/leaderboard" exact component={AdminLeaderboard} />
        <Route
          path="/admin/completed_climbs/:climberId"
          exact
          component={AdminSingleUserCompletedClimbs}
        />
        <Route path="/myprofile" exact component={MyProfile} />
        <Route path="/myprofile/edit" exact component={EditMyProfile} />
        <Route path="/admin/event" exact component={AdminEvent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
