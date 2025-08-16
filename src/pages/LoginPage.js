// src/pages/LoginPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Container, Form, Button } from "react-bootstrap";
import theme from "../theme";
import Notification from "../components/Notification";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [notification, setNotification] = useState({ message: "", variant: "" });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.notice) {
      setNotification({ message: location.state.notice, variant: "success" });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: "", variant: "" });
    try {
      await loginUser(formData);
      setNotification({ message: "Logged in successfully.", variant: "success" });
      setTimeout(() => navigate("/profile"), 800);
    } catch (err) {
      setNotification({ message: "Invalid username or password. Please try again.", variant: "danger" });
    }
  };

  return (
    <Container className="mt-5">
      <div className="form-container">
        <h2 className="text-center" style={{ color: theme.textColor }}>Login</h2>

        <Notification
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification({ message: "", variant: "" })}
        />

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100" style={{ backgroundColor: theme.primaryColor }}>
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
