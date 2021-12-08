import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import climber from "../images/climber.png";
import "../styles/NavigationBar.scss";

const NavigationBar = () => {
  const [state, setState] = useState({
    toggle: false,
    logged: false,
  });

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    // const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);
  }, [localStorage.getItem("token")]); // way to fire this function when token in localstorage update

  const isToken = () => {
    if (state.logged) {
      return (
        <Nav.Link
          onClick={() => {
            localStorage.removeItem("token");
            history.push("/");
          }}
        >
          <Link className="navbar-brand-text">Logout</Link>
        </Nav.Link>
      );
    } else {
      return null;
    }
  };

  const history = useHistory();

  return (
    <header>
      <Navbar
        expanded={state.toggle}
        className="navbar"
        onToggle={() => {
          setState((prevState) => {
            return {
              toggle: !prevState.toggle,
            };
          });
        }}
        expand="md"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>
          <a href="/" className="navbar-brand">
            <img
              alt="company logo"
              className="d-inline-block"
              src={climber}
            ></img>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link
              onClick={() => {
                setState({
                  toggle: false,
                });
              }}
            >
              <Link className="navbar-brand-text" to="/rocks">
                Lynn Woods Areas
              </Link>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setState({
                  toggle: false,
                });
              }}
            >
              <Link className="navbar-brand-text" to="/map">
                Bouldering Map
              </Link>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setState({
                  toggle: false,
                });
              }}
            >
              <Link
                className="navbar-brand-text"
                to="/requests"
                onClick={() => {
                  setState({
                    toggle: false,
                  });
                }}
              >
                Requests
              </Link>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setState({
                  toggle: false,
                });
              }}
            >
              <Link className="navbar-brand-text" to="/completed_climbs">
                Completed Climbs
              </Link>
            </Nav.Link>
            {isToken()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NavigationBar;
