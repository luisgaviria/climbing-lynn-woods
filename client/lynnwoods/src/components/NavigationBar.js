import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useState } from "react";

import climber from "../images/climber.png";
import "../styles/NavigationBar.scss";

const NavigationBar = () => {
  const [state, setState] = useState({
    toggle: false,
  });
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NavigationBar;
