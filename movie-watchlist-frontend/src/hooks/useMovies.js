// useMovies.js (custom hook)

import { useEffect, useState } from "react";
import { fetchMovies } from "../services/movieService";

export const useMovies = (filters) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovies(filters);
        setMovies(data.movies);
        setTotalPages(data.pages);
      } catch (error) {
        setError(error.message || "Error fetching movies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { movies, totalPages, loading, error };
};
