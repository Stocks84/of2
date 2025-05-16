import api from './api';

const API_URL = "http://127.0.0.1:8000/api/games/";

const gameService = {
  getGames: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`${API_URL}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  getGameById: async (id) => {
    try {
      if (!id) throw new Error("Game ID is required.")
      console.log(`Fetching game details for ID:`, id);
      const response = await api.get(`${API_URL}${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching game with ID ${id}:`, error);
      throw error;
    }
  },

  getUserProfile: async () => {
    try {
      console.log("Fetching user profile...");
      const response = await api.get("http://127.0.0.1:8000/api/profile/"); // Adjust the endpoint if needed
      console.log("User profile Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
  
  getUserGames: async () => {
    try {
      console.log("Fetching only the user's games...");
      const response = await api.get("http://127.0.0.1:8000/api/games/", {
        params: { user_games: "true" }, // Ensure correct query param
      });
  
      console.log("Full API Response:", response.data);
  
      if (response.data.results && Array.isArray(response.data.results)) {
        return response.data.results; // Extract only the array
      } else {
        console.error("Unexpected response format:", response.data);
        return []; // Return an empty array to avoid .map() errors
      }
    } catch (error) {
      console.error("Error fetching user's games:", error);
      throw error;
    }
  },
  

  createGame: async (gameData) => {
    try {
      console.log("Sending game data:", gameData);

      const response = await api.post(`${API_URL}`, gameData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating game:', error.response?.data || error);
      throw error;
    }
  },

  updateGame: async (gameId, updatedData) => {
    try {
      const response = await api.put(`${API_URL}${gameId}/`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating game with ID ${gameId}:`, error);
      throw error;
    }
  },

  deleteGame: async (gameId) => {
    try {
      await api.delete(`${API_URL}${gameId}/`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting game with ID ${gameId}:`, error);
      throw error;
    }
  },

  // Like or Unlike a game
likeGame: async (gameId) => {
  try {
    const response = await api.post(`/api/games/${gameId}/like/`);
    return response.data;
  } catch (error) {
    console.error(`Error liking game ${gameId}:`, error);
    throw error;
  }
},

// Get comments for a game
getComments: async (gameId) => {
  try {
    const response = await api.get(`/api/games/${gameId}/comments/`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
},

// Post a new comment
postComment: async (gameId, content) => {
  try {
    const response = await api.post(`/api/games/${gameId}/comment/`, { 
      text: content
    });
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error.response?.data || error.message);
    throw error;
  }
},

// Delete a comment
deleteComment: async (commentId) => {
  try {
    await api.delete(`/games/comments/${commentId}/`);
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error.response?.data || error.message);
    throw error;
  }
},

// Edit a comment
editComment: async (commentId, newText) => {
  try {
    const response = await api.patch(`/games/comments/${commentId}/`, {
      text: newText,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing comment:", error.response?.data || error.message);
    throw error;
  }
},


};

export default gameService;
