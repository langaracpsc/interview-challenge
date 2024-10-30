import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/solid";

const MovieCard = ({ movie }) => {
console.log('movie :', movie);
  const renderStars = (rating) => {
    return Array.from({ length: movie.rating }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? "text-yellow-500" : "text-gray-400"}`}
      />
    ));
  };

  return (
    <Link to={`/movies/${movie._id}`} className="max-w-sm rounded overflow-hidden shadow-lg block">
      <img
        className="w-full"
        src="https://th.bing.com/th/id/OIP.mA5SG8RpkLC4PvEhT45igAHaKr?rs=1&pid=ImgDetMain"
        alt="Movie Poster"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">
          Release Year: {movie.releaseYear}
        </p>
        <p className="text-gray-700 text-base">
          Status: {movie.watched ? "Watched" : "Unwatched"}
        </p>
        {movie.watched && (
          <div className="flex items-center">
            <p className="mr-2">Rating:</p>
            <div className="flex">{renderStars(movie.rating)}</div>
          </div>
        )}
      </div>
      <div className="px-6 pt-4 pb-2">
        {movie.genres.map((genre, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{genre}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default MovieCard;
