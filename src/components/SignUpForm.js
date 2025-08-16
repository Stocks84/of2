import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import theme from "../theme";
import Notification from "./Notification";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [notification, setNotification] = useState({ message: "", variant: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setNotification({ message: "Passwords do not match", variant: "danger" });
      return;
    }

    try {
      await registerUser(formData);
      setNotification({ message: "Registration successful! Redirecting to login...", variant: "success" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setNotification({ message: "Failed to register", variant: "danger" });
    }
  };

  return (
    <Container className="mt-5">
      <div className="form-container">
        <h2 className="text-center" style={{ color: theme.textColor }}>Sign Up</h2>

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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
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

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100" style={{ backgroundColor: theme.primaryColor }}>
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpForm;


