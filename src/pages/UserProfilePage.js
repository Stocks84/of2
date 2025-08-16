// src/pages/UserProfilePage.js
import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "../services/userService";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Notification from "../components/Notification";
import theme from "../theme";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const profileData = await getUserProfile();
        setUser(profileData);
        setFormData(profileData);
      } catch (err) {
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(formData);
      setUser(updatedUser);
      setEditMode(false);
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  const [notification, setNotification] = useState({ message: "", variant: "" });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
  
    try {
      // Delete account on the server
      await deleteUserAccount();
  
      // Immediately log out locally (clear tokens, username, header)
      logoutUser();
  
      // Redirect with a message
      navigate("/login", { state: { notice: "Your account was deleted successfully." } });
    } catch (err) {
      setNotification({ message: "Failed to delete account.", variant: "danger" });
    }
  };
  


  if (loading) return <p>Loading profile...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <div className="form-container">
        <h2 style={{ color: theme.textColor }}>User Profile</h2>
        
        {!editMode ? (
          <div>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Bio:</strong> {user?.bio}</p>
            <p><strong>Location:</strong> {user?.location}</p>
            <p><strong>Favorite Drink:</strong> {user?.favorite_drink}</p>
            <Button style={{ backgroundColor: theme.primaryColor }} onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
            <Button variant="danger" className="ms-2" onClick={handleDelete}>
              Delete Account
            </Button>

            <Notification 
              message={notification.message} 
              variant={notification.variant} 
              onClose={() => setNotification({ message: "", variant: "" })} 
            />
          </div>
        ) : (
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
              <Form.Label>Bio</Form.Label>
              <Form.Control 
                type="text" 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange} 
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
                style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
              />
            </Form.Group>

            <Button type="submit" style={{ backgroundColor: theme.primaryColor }}>
              Save Changes
            </Button>
            <Button 
              variant="secondary" 
              className="ms-2" 
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default UserProfilePage;
