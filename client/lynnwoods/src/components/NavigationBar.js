import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import climber from "../images/climber.png";
import "../styles/NavigationBar.scss";

const NavigationBar = () => {
  return (
    <header>
      <Navbar
        className="navbar"
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
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
              style={{ marginTop: "-0.8rem" }}
              className="navbar-brand-text"
            >
              <Link className="navbar-brand-text" to="/rocks">
                Rocks
              </Link>
            </Nav.Link>
            <Nav.Link
              style={{ marginTop: "-0.8rem" }}
              className="navbar-brand-text"
            >
              <Link className="navbar-brand-text" to="/map">
                Map
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navbar-brand-text" to="/requests">
                Requests
              </Link>
            </Nav.Link>
            <Nav.Link>
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
