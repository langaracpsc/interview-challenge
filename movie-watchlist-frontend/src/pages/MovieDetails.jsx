import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, updateMovie } from '../services/movieService';
import MoviePoster from '../Components/MoviePoster';
import MovieInfo from '../Components/MovieInfo';
import WatchStatus from '../Components/WatchStatus';
import Rating from '../Components/Rating';


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovieById(id);
      setMovie(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updateData) => {
    setUpdating(true);
    setError(null);
    try {
      const updatedMovie = await updateMovie(id, updateData);
      setMovie(updatedMovie);
    } catch (error) {
      setError(error.message || 'Failed to update movie');
    } finally {
      setUpdating(false);
    }
  };

  const handleWatchedToggle = () => {
    const newWatchedStatus = !movie.watched;
    const updatedData = {
      watched: newWatchedStatus,
      rating: newWatchedStatus ? movie.rating || 1 : 1, // Default rating when marking as watched
    };
    setMovie((prev) => ({
      ...prev,
      watched: newWatchedStatus,
      rating: updatedData.rating,
    }));
    handleUpdate(updatedData);
  };

  const handleRatingChange = (e) => {
    const newRating = parseInt(e.target.value);
    setMovie((prev) => ({
      ...prev,
      rating: newRating,
    }));
    handleUpdate({ rating: newRating, watched: movie.watched });
  };

  if (loading) return <p>Loading movie details...</p>;

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="p-8">
        <MoviePoster
          src="https://th.bing.com/th/id/OIP.FgSHy4RMgjNNcLv1UqLDdgHaH_?rs=1&pid=ImgDetMain"
          alt={movie.title}
        />
        <MovieInfo title={movie.title} releaseYear={movie.releaseYear} genres={movie.genres} />
        <WatchStatus watched={movie.watched} updating={updating} onToggle={handleWatchedToggle} />
        {movie.watched && <Rating rating={movie.rating} updating={updating} onRatingChange={handleRatingChange} />}
      </div>
    </div>
  );
};

export default MovieDetails;
