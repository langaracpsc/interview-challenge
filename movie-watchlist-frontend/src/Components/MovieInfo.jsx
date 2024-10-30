import React from 'react';

const MovieInfo = ({ title, releaseYear, genres }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
      {title}
    </h1>

    <div className="space-y-4">
      <p className="text-lg text-gray-700">
        Release Year: <span className="ml-2 font-semibold">{releaseYear}</span>
      </p>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full font-medium"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default MovieInfo;
