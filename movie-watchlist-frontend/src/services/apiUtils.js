import axios from "axios";

// Base API URL
export const API_URL = "http://localhost:8000/api/v1";

// Reusable GET request function
export const getRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching data from ${endpoint}:`,
      error.response?.data || error.message
    );
    throw (
      error.response?.data || {
        message: `An error occurred while fetching data from ${endpoint}.`,
      }
    );
  }
};

// Utility function to clean up query parameters
export const cleanQueryParams = (query) => {
  const cleanQuery = {};
  Object.keys(query).forEach((key) => {
    if (query[key]) {
      cleanQuery[key] = query[key];
    }
  });
  return cleanQuery;
};
