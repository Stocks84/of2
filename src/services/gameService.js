import api from './api';

const API_URL = "/api/games/";

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
      if (!id) throw new Error("Game ID is required.");
      const response = await api.get(`${API_URL}${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching game with ID ${id}:`, error);
      throw error;
    }
  },

  getUserProfile: async () => {
    try {
      const response = await api.get("/api/profile/");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  getUserGames: async () => {
    try {
      const response = await api.get("/api/games/", {
        params: { user_games: "true" },
      });
      return response.data.results || [];
    } catch (error) {
      console.error("Error fetching user's games:", error);
      throw error;
    }
  },

  createGame: async (gameData) => {
    try {
      const response = await api.post(API_URL, gameData, {
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

  getComments: async (gameId) => {
    try {
      const response = await api.get(`/api/games/${gameId}/comments/`);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },

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

  deleteComment: async (commentId) => {
    try {
      const response = await api.delete(`/api/games/comments/${commentId}/`);
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error.response?.data || error);
      throw error;
    }
  },

  editComment: async (commentId, text) => {
    try {
      const response = await api.patch(`/api/games/comments/${commentId}/edit/`, {
        text
      });
      return response.data;
    } catch (error) {
      console.error("Error editing comment:", error.response?.data || error.message);
      throw error;
    }
  },

  likeGame: async (gameId) => {
    try {
      const response = await api.post(`/api/games/${gameId}/like/`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error liking game ${gameId}:`, error.response?.data || error);
      throw error;
    }
  },

  unlikeGame: async (gameId) => {
    try {
      const response = await api.delete(`/api/games/${gameId}/unlike/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error unliking game ${gameId}:`, error.response?.data || error);
      throw error;
    }
  },
};

export default gameService;

