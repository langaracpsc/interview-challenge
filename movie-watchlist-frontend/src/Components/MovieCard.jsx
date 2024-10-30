import React from "react";
import { Link } from "react-router-dom";
import { StarIcon as SolidStarIcon } from "@heroicons/react/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/outline";

const MovieCard = ({ movie }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) =>
          rating >= star ? (
            <SolidStarIcon key={star} className="w-5 h-5 text-yellow-500" />
          ) : (
            <OutlineStarIcon key={star} className="w-5 h-5 text-gray-400" />
          )
        )}
      </div>
    );
  };

  return (
    <Link
      to={`/movies/${movie._id}`}
      className="max-w-sm rounded overflow-hidden shadow-lg block transition-transform transform hover:scale-105"
    >
      <img
        className="w-full h-64 object-cover"
        src="https://th.bing.com/th/id/OIP.FgSHy4RMgjNNcLv1UqLDdgHaH_?rs=1&pid=ImgDetMain"
        alt="Movie Poster"
      />
      <div className="px-10 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">
          Release Year: {movie.releaseYear}
        </p>
        <p className="text-gray-700 text-base">
          Status: {movie.watched ? "Watched" : "Unwatched"}
        </p>
        {movie.watched && (
          <div className="flex items-center mt-2">
            <p className="mr-2">Rating:</p>
            {renderStars(movie.rating)}
          </div>
        )}
      </div>
      <div className="px-10 pt-4 pb-2">
        {movie.genres.map((genre, index) => (
          <span
            key={index}
            className="inline-block bg-blue-50 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 mr-2 mb-2"
          >
            {genre}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default MovieCard;
