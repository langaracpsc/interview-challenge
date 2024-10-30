import React, { useEffect, useState } from 'react';

import { useGenres } from '../hooks/useGenres';
import { useMovies } from '../hooks/useMovies';
import SearchBar from '../Components/SearchBar';
import MovieFilters from '../Components/MovieFilters';
import Pagination from '../Components/Pagination';
import MovieCard from '../Components/MovieCard';
import { useDebounce } from '../hooks/useDebounce';


const MovieList = () => {
  const [filters, setFilters] = useState({
    genre: '',
    watched: '',
    rating: '',
    page: 1,
    limit: 10,
    search: '',
  });

  const { movies, totalPages, loading, error } = useMovies(filters);
  const { genres } = useGenres();
  const debouncedSearch = useDebounce(filters.search, 500);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 }); 
  };
  

  const handlePageChange = (pageNumber) => {
    setFilters({ ...filters, page: pageNumber });
  };
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Movie Watchlist</h1>

      {/* Search Bar */}
      <SearchBar searchValue={filters.search} onSearchChange={handleSearchChange} />

      {/* Filters */}
      <MovieFilters genres={genres} filters={filters} onFilterChange={handleFilterChange} />

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
        <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MovieList;
