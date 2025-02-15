import api from "./api";

// Fetch user profile
export const getUserProfile = async () => {
    try {
        const response = await api.get("/api/profile/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        throw error;
    }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
    console.log("Sending profile data:", profileData);
    try {
        const response = await api.patch("/api/profile/", profileData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        console.log("Profile update successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error.response?.data || error.message);
        throw error;
    }
};


// Delete user account
export const deleteUserAccount = async () => {
    try {
        const response = await api.delete("/api/profile/");
        return response.data;
    } catch (error) {
        console.error("Error deleting account:", error);
        throw error;
    }
};
