import api from './api';


// User login
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/api/token/', credentials);

        console.log("Login response:", response.data);

        if (response.data.access && response.data.refresh) {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          console.log("Tokens saved to localStorage!");
        } else {
          console.error("Login response missing tokens:", response.data);
        }

        const userProfile = await api.get("/api/profile", {
          headers: { "Authorization": `Bearer ${response.data.access}` }
        });
        
        // Dispatch global login event
        window.dispatchEvent(new Event("authChanged"));

        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error);
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Dispatch global logout event
    window.dispatchEvent(new Event("authChanged"));
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

