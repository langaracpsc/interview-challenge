import React, { useState, useEffect, useRef } from "react";
import { addMovie, fetchGenres } from "../services/movieService";
import { useNavigate } from "react-router-dom";

// Function to generate an array of years from 1900 to the current year
const getYears = () => {
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let year = 1900; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

export function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(""); // Now we'll use a dropdown for this
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (err) {
        setError("Failed to load genres");
      }
    };
    loadGenres();
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !releaseYear || selectedGenres.length === 0) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await addMovie({
        title,
        releaseYear,
        genres: selectedGenres, // Now sending genre names directly
      });
      setTitle("");
      setReleaseYear("");
      setSelectedGenres([]);
      alert("Movie added successfully");
      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  // Toggle genre selection
  const toggleGenre = (genreName) => {
    setSelectedGenres((prev) =>
      prev.includes(genreName)
        ? prev.filter((name) => name !== genreName)
        : [...prev, genreName]
    );
  };

  // Get the list of years for the dropdown
  const years = getYears();

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Release Year Dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="releaseYear"
            className="block text-sm font-medium text-gray-700"
          >
            Release Year
          </label>
          <select
            id="releaseYear"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Genre Multi-select */}
        <div className="space-y-2" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700">
            Genres
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {selectedGenres.length === 0 ? (
                <span className="text-gray-500">Select genres</span>
              ) : (
                <span className="text-gray-900">
                  {selectedGenres.length} genre(s) selected
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {genres.map((genre) => (
                  <div
                    key={genre._id}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleGenre(genre.name)} // Using genre.name instead of genre._id
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre.name)} // Check against genre.name
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2">{genre.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Genres Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedGenres.map((genreName) => (
              <span
                key={genreName}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {genreName}
                <button
                  type="button"
                  onClick={() => toggleGenre(genreName)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-blue-200 focus:outline-none"
                >
                  <span className="sr-only">Remove genre</span>×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white rounded-md transition-colors ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Movie"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

export default AddMovieForm;
