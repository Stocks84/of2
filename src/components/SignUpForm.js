// src/components/SignUpForm.js
import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";
import theme from "../theme";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Failed to register");
    }
  };

  return (
    <Container className="mt-5">
      <div className="form-container">
        <h2 className="text-center" style={{ color: theme.textColor }}>Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
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

