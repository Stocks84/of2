import api from './api';

const gameService = {
  getGames: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/games/?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  getGameById: async (gameId) => {
    try {
      const response = await api.get(`/games/${gameId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching game with ID ${gameId}:`, error);
      throw error;
    }
  },

  createGame: async (gameData) => {
    try {
      const response = await api.post('/games/', gameData);
      return response.data;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  },

  updateGame: async (gameId, updatedData) => {
    try {
      const response = await api.put(`/games/${gameId}/`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating game with ID ${gameId}:`, error);
      throw error;
    }
  },

  deleteGame: async (gameId) => {
    try {
      await api.delete(`/games/${gameId}/`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting game with ID ${gameId}:`, error);
      throw error;
    }
  },
};

export default gameService;
