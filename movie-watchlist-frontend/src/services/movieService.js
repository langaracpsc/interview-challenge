import axios from "axios";
import { API_URL, cleanQueryParams, getRequest } from "./apiUtils";

// Fetch all movies with pagination and filters
export const fetchMovies = async (query = {}) => {
  const cleanedQuery = cleanQueryParams(query);
  return getRequest("movies", cleanedQuery);
};

// Fetch genres
export const fetchGenres = async () => {
  return getRequest("genres");
};

// Fetch a movie by ID
export const getMovieById = async (movieId) => {
  return getRequest(`movies/${movieId}`);
};

export const addMovie = async (movieData) => {
  try {
    const response = await axios.post(`${API_URL}/movies`, movieData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// Update a movie by its ID
export const updateMovie = async (movieId, updatedData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/movies/${movieId}`,
      updatedData
    );
    return response.data; // Return updated movie from the backend
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to update movie" };
  }
};
