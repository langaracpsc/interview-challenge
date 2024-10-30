import React, { useState, useEffect } from 'react';
import { addMovie, fetchGenres } from '../services/movieService';

export function AddMovieForm() {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (err) {
        setError('Failed to load genres');
      }
    };
    loadGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !releaseYear || selectedGenres.length === 0) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await addMovie({ title, releaseYear, genres: selectedGenres });
      setTitle('');
      setReleaseYear('');
      setSelectedGenres([]);
      alert('Movie added successfully');
    } catch (error) {
      setError(error.message || 'Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Release Year */}
        <div className="space-y-2">
          <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">
            Release Year
          </label>
          <input
            id="releaseYear"
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Genre Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Genres</label>
          <select
            multiple
            value={selectedGenres}
            onChange={(e) => setSelectedGenres([...e.target.selectedOptions].map(option => option.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">
          {loading ? 'Adding...' : 'Add Movie'}
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}

export default AddMovieForm;
