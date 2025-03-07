import api from './api';

// User login
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/api/token/', credentials);

        console.log("Login response:", response.data);

        if (response.data.access && response.data.refresh) {
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          console.log("Tokens saved to localStorage!");
        } else {
          console.error("Missing access or refresh token in response!");
        }

        // Dispatch global login event
        window.dispatchEvent(new Event("authChanged"));

        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// User signup 
export const registerUser = async (userData) => {
    try {
      const response = await api.post("/api/register/", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: "Something went wrong" };
    }
  };


// User logout
export const logoutUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Dispatch global logout event
    window.dispatchEvent(new Event("authChanged"));
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};
