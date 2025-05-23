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
    first_name: "",
    last_name: "",
    age: "",
    location: "",
    favorite_drink: "",
    bio: "",
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
      const submitData = { ...formData };
      delete submitData.confirmPassword; // not needed by backend

      await registerUser(submitData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to register. Please check your input and try again.");
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
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Favorite Drink</Form.Label>
            <Form.Control
              type="text"
              name="favorite_drink"
              value={formData.favorite_drink}
              onChange={handleChange}
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpForm;
