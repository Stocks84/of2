// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Container, Form, Button, Alert } from "react-bootstrap";
import theme from "../theme";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await loginUser(formData);
      navigate("/profile");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <div className="form-container">
        <h2 className="text-center" style={{ color: theme.textColor }}>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}

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
