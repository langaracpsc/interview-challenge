import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, updateMovie } from "../services/movieService";

const MovieDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    movie: null,
    loading: true,
    error: null,
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
      const updatedMovie = await updateMovie(id, updateData);
      setState((prev) => ({
        ...prev,
        movie: updatedMovie,
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

  // Toggle watched status and update it
  const handleWatchedToggle = () => {
    const newWatchedStatus = !state.movie.watched;
    const updatedData = {
      watched: newWatchedStatus,
      rating: newWatchedStatus ? state.movie.rating || 1 : 1,  // Default rating when marking as watched
    };
    setState((prev) => ({
      ...prev,
      movie: {
        ...prev.movie,
        watched: newWatchedStatus,
        rating: updatedData.rating,
      },
    }));
    handleUpdate(updatedData);
  };

  // Handle rating change
  const handleRatingChange = (e) => {
    const newRating = parseInt(e.target.value);
    const updatedData = {
      rating: newRating,
      watched: state.movie.watched,
    };
    setState((prev) => ({
      ...prev,
      movie: {
        ...prev.movie,
        rating: newRating,
      },
    }));
    handleUpdate(updatedData);
  };

  const { movie, updating } = state;

  if (state.loading) return <p>Loading movie details...</p>;

  if (state.error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{state.error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="p-8">
        {/* Movie Poster */}
        <img
          className="w-full h-64 object-cover rounded-md mb-6"
          src="https://th.bing.com/th/id/OIP.FgSHy4RMgjNNcLv1UqLDdgHaH_?rs=1&pid=ImgDetMain"
          alt="Movie Poster"
        />
        
        {/* Movie Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
          {movie.title}
        </h1>

        <div className="space-y-6">
          {/* Release Year and Genres */}
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Release Year: <span className="ml-2 font-semibold">{movie.releaseYear}</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full font-medium"
                >
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
                ${updating ? "cursor-not-allowed opacity-50" : ""}
                ${
                  movie.watched
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                }
              `}
            >
              {movie.watched ? "Status: Watched" : "Mark as Watched"}
            </button>

            {!movie.watched && (
              <p className="text-sm text-gray-500">
                Mark the movie as "Watched" to rate it.
              </p>
            )}
          </div>

          {/* Rating Section: Only visible if movie is watched */}
          {movie.watched && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">
                Rate this movie:
              </p>
              <select
                value={movie.rating}
                onChange={handleRatingChange}
                disabled={updating}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Update Status */}
          {updating && <div className="text-sm text-blue-600">Updating...</div>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
