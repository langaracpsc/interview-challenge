import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, updateMovie } from "../services/movieService";
import { StarIcon } from "@heroicons/react/solid";

// Rating Stars Component
const RatingStars = ({ rating, onRatingChange, disabled }) => {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={disabled}
          onClick={() => onRatingChange(star)}
          className={`transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1
            ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}  
        >
          <StarIcon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
};

// MovieDetails Component
const MovieDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    movie: null,
    loading: true,
    error: null,
    watched: false,
    rating: 1, // Default rating set to 1
    updating: false,
  });

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await getMovieById(id);
      setState((prev) => ({
        ...prev,
        movie: data,
        watched: data.watched,
        rating: data.rating || 1, // Default rating if not set
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message || "Failed to fetch movie details",
        loading: false,
      }));
    }
  };

  const handleUpdate = async (updateData) => {
    setState((prev) => ({ ...prev, updating: true, error: null }));
    try {
      await updateMovie(id, updateData);
      setState((prev) => ({
        ...prev,
        ...updateData,
        movie: { ...prev.movie, ...updateData }, // Update movie object in state
        updating: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message || "Failed to update movie",
        updating: false,
      }));
    }
  };

  const handleWatchedToggle = () => handleUpdate({ watched: !state.watched });
  const handleRatingChange = (newRating) => handleUpdate({ rating: newRating });

  if (state.loading) return <p>Loading movie details...</p>;

  if (state.error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{state.error}</p>
      </div>
    );
  }

  const { movie, watched, rating, updating } = state;
  

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
          {movie.title}
        </h1>

        <div className="space-y-6">
          {/* Movie Details */}
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Release Year: <span className="ml-2 font-semibold">{movie.releaseYear}</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full font-medium">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Watch Status */}
          <div className="space-y-4">
            <button
              onClick={handleWatchedToggle}
              disabled={updating}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${updating ? 'cursor-not-allowed opacity-50' : ''}
                ${watched 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                }
              `}
            >
              {watched ? "Status: Watched" : "Mark as Watched"}
            </button>

            {!watched && (
              <p className="text-sm text-gray-500">
                Mark the movie as "Watched" to rate it.
              </p>
            )}
          </div>

          {/* Rating Section: Only visible if movie is watched */}
          {watched && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">Rate this movie:</p>
              <RatingStars
                rating={rating}
                onRatingChange={handleRatingChange}
                disabled={updating}
              />
            </div>
          )}

          {/* Update Status */}
          {updating && (
            <div className="text-sm text-blue-600">
              Updating...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
