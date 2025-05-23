import axios from "axios";

const API_BASE_URL = "drf-old-fashion-118da20fd480.herokuapp.com";
const api = axios.create({ 
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
});

// Automatically add JWT token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Automatically refresh expired tokens
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // If token is expired, try refreshing it
        if (error.response?.status === 403 && error.response?.data?.code === "token_not_valid") {
            console.log("Token expired, attempting to refresh...");

            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) {
                    console.error("No refresh token found, redirecting to login.");
                    window.location.href = "/login"; // Force re-login
                    return Promise.reject(error);
                }

                // Request a new access token
                const refreshResponse = await axios.post(`${API_BASE_URL}api/token/refresh/`, {
                    refresh: refreshToken,
                });

                const newAccessToken = refreshResponse.data.access;
                localStorage.setItem("access_token", newAccessToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login"; // Force re-login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;



