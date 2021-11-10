import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import GoogleAuth from "./containers/GoogleAuth";
import RegisterForm from "./containers/RegisterForm";
import Rocks from "./containers/Rocks";
import Boulder from "./containers/Boulder";
import Path from "./containers/Path";
import Requests from "./containers/Requests";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/googleauth" exact component={GoogleAuth} />
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/rocks" exact component={Rocks} />
        <Route path="/rocks/:boulder" exact component={Boulder} />
        <Route path="/path/:path" exact component={Path} />
        <Route path="/requests" exact component={Requests} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
