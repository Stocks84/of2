import api from './api';

// User login
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/api/token/', credentials);
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// User signup
export const signUpUser = async (userData) => {
    try {
        const response = await api.post('/api/signup/', userData);
        return response.data;
    } catch (error) {
        console.error("Signup failed:", error);
        throw error;
    }
};

// User logout
export const logoutUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};
