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

  createGame: async (gameData) => {
    try {
      const response = await api.post(`${API_URL}`, gameData);
      return response.data;
    } catch (error) {
      console.error('Error creating game:', error);
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
};

export default gameService;
