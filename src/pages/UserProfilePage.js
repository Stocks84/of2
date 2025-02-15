import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../services/userService';

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
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
    }, []);

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

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                await deleteUserAccount();
                alert("Account deleted successfully.");
                // Redirect user after deletion
                window.location.href = "/";
            } catch (err) {
                alert("Failed to delete account.");
            }
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>User Profile</h2>
            {!editMode ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>First Name:</strong> {user.first_name}</p>
                    <p><strong>Last Name:</strong> {user.last_name}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                    <p><strong>Favorite Drink:</strong> {user.favorite_drink}</p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />

                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />

                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />

                    <label>Favorite Drink:</label>
                    <input type="text" name="favorite_drink" value={formData.favorite_drink} onChange={handleChange} />

                    <button type="submit">Save Changes</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            )}
            <button onClick={handleDelete} style={{ color: "red" }}>Delete Account</button>
        </div>
    );
};

export default UserProfilePage;
