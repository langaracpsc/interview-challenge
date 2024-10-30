import React, { useState, useEffect } from "react";
import Pagination from "../Components/Pagination";
import { fetchMovies } from "../services/movieService";
import MovieCard from "../Components/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    watched: "",
    rating: "",
    page: 1,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch movies whenever filters change
  useEffect(() => {
    fetchMoviesData();
  }, [filters]);

  const fetchMoviesData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch movies based on filters
      const data = await fetchMovies(filters);
      setMovies(data.movies);
      setTotalPages(data.pages); // Set total pages for pagination
    } catch (error) {
      setError(error.message || "Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes for genre, watched status, and rating
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 }); // Reset page to 1 on filter change
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setFilters({ ...filters, page: pageNumber });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Movie Watchlist</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 mb-6">
        <select
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          {/* Add more genres dynamically if necessary */}
        </select>

        <select
          name="watched"
          value={filters.watched}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All</option>
          <option value="true">Watched</option>
          <option value="false">Unwatched</option>
        </select>

        <select
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Ratings</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      {/* Movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MovieList;
