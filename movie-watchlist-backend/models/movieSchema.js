// models/Movie.js
const mongoose = require("mongoose");

// Movie Schema Definition
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
    },
    genres: {
      type: [String],
      required: [true, "At least one genre is required"],
    },
    watched: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Movie model
module.exports = mongoose.model("Movie", movieSchema);
