import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

// Fetch all movies with pagination and filters
export const fetchMovies = async (query = {}) => {
  try {
    const cleanQuery = {}; // Clean query without empty filters

    // Remove empty filters from the query
    Object.keys(query).forEach((key) => {
      if (query[key]) {
        cleanQuery[key] = query[key];
      }
    });

    const response = await axios.get(`${API_URL}/movies`, {
      params: cleanQuery,
    });
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
export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch movie details" };
  }
};

// Update a movie by its ID
export const updateMovie = async (movieId, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/movies/${movieId}`, updatedData);
    return response.data;  // Return updated movie from the backend
  } catch (error) {
    throw error.response ? error.response.data : { message: "Failed to update movie" };
  }
};