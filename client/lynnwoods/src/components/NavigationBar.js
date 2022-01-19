import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

import climber from "../images/climber.png";
import "../styles/NavigationBar.scss";

const NavigationBar = (props) => {
  const [state, setState] = useState({
    toggle: false,
    logged: false,
  });

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
            {localStorage.getItem("admin") ? (
              <Nav.Link>
                <Link className="navbar-brand-text" to="/admin/leaderboard">
                  Leaderboard
                </Link>
              </Nav.Link>
            ) : null}
            {props.logged ? (
              <Nav.Link
                onClick={() => {
                  props.loggedOut();
                }}
              >
                <Link className="navbar-brand-text" to="/">
                  Logout
                </Link>
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    logged: state.logged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loggedOut: () => dispatch(actions.loggedOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
