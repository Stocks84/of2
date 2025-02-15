import api from './api';

// Fetch user profile
export const getUserProfile = async () => {
    try {
        const response = await api.get('/api/profile/');
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

// Update user profile
export const updateUserProfile = async (updatedData) => {
    try {
        const response = await api.patch('/api/profile/', updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

// Change password
export const changeUserPassword = async (oldPassword, newPassword) => {
    try {
        const response = await api.post('/api/change-password/', {
            old_password: oldPassword,
            new_password: newPassword
        });
        return response.data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
};

// Delete user account
export const deleteUserAccount = async () => {
    try {
        const response = await api.delete('/api/profile/');
        return response.data;
    } catch (error) {
        console.error("Error deleting account:", error);
        throw error;
    }
};
