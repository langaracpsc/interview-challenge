import React from 'react';

// Filter component that handles genre, rating, and watched status filters
const MovieFilters = ({ genres, filters, onFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 mb-6">
      <select
        name="genre"
        value={filters.genre}
        onChange={onFilterChange}
        className="px-4 py-2 border border-gray-300 rounded"
      >
        <option value="">All Genres</option>
        {genres?.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select
        name="watched"
        value={filters.watched}
        onChange={onFilterChange}
        className="px-4 py-2 border border-gray-300 rounded"
      >
        <option value="">All</option>
        <option value="true">Watched</option>
        <option value="false">Unwatched</option>
      </select>

      <select
        name="rating"
        value={filters.rating}
        onChange={onFilterChange}
        className="px-4 py-2 border border-gray-300 rounded"
      >
        <option value="">All Ratings</option>
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating} value={rating}>
            {rating} Star{rating > 1 ? 's' : ''}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieFilters;
