import axios from 'axios';

const API_URL = '/api/v1';

// Fetch all movies with pagination and filters
export const fetchMovies = async (query = {}) => {
  try {
    const response = await axios.get(`${API_URL}/movies`, { params: query });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch genres
export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genres`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add new movie
export const addMovie = async (movieData) => {
  try {
    const response = await axios.post(`${API_URL}/movies`, movieData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
