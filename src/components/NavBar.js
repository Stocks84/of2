import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/OF-logo.png";
import { isAuthenticated, logoutUser } from "../services/authService";

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  // Effect to listen for login/logout changes
  useEffect(() => {
    const updateAuthStatus = () => {
      setLoggedIn(isAuthenticated());
    };

    // Listen for the "authChanged" event triggered in authService.js
    window.addEventListener("authChanged", updateAuthStatus);

    return () => {
      window.removeEventListener("authChanged", updateAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2 rounded-circle"
          />
          OldFashion
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/games">Games</Nav.Link>

            {loggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;


