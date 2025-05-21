import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/OF-logo.png";
import { isAuthenticated, logoutUser } from "../services/authService";
import theme from "../theme"; 

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const updateAuthStatus = () => {
      setLoggedIn(isAuthenticated());
    };
    window.addEventListener("authChanged", updateAuthStatus);
    return () => {
      window.removeEventListener("authChanged", updateAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: theme.backgroundColor }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: theme.textColor }}>
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
            <Nav.Link as={Link} to="/" style={{ color: theme.textColor }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/games" style={{ color: theme.textColor }}>Games</Nav.Link>
            {loggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile" style={{ color: theme.textColor }}>Profile</Nav.Link>
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  className="ms-2"
                  style={{ color: theme.textColor, borderColor: theme.textColor }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" style={{ color: theme.textColor }}>Login</Nav.Link>
            )}
            <Nav.Link as={Link} to="/signup" style={{ color: theme.textColor }}>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;


