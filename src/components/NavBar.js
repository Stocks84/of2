import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/OF-logo.png";
import { isAuthenticated, logoutUser } from "../services/authService";
import theme from "../theme"; 

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    const updateAuthStatus = () => {
      setLoggedIn(isAuthenticated());
      setUsername(localStorage.getItem("username") || "");
    };
    window.addEventListener("authChanged", updateAuthStatus);
    return () => window.removeEventListener("authChanged", updateAuthStatus);
  }, []);

  const handleLogout = () => {
    logoutUser(); // should clear tokens + username
    // Optional: emit your existing authChanged event so other tabs/components react
    window.dispatchEvent(new Event("authChanged"));
    // Redirect with a notice shown on the Login page
    navigate("/login", { state: { notice: "Signed out successfully." } });
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{ backgroundColor: theme.backgroundColor }}
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: theme.textColor }}>
          <img
            src={logo}
            alt="OldFashion logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2 rounded-circle"
          />
          OldFashion
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={Link} to="/" style={{ color: theme.textColor }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/games" style={{ color: theme.textColor }}>
              Games
            </Nav.Link>

            {loggedIn ? (
              <>
                {/* Friendly username badge */}
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
                  <Badge bg="dark" pill className="me-2">{username || "User"}</Badge>
                  <span style={{ color: theme.textColor }}>Profile</span>
                </Nav.Link>

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
              <>
                <Nav.Link as={Link} to="/login" style={{ color: theme.textColor }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ color: theme.textColor }}>
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;



