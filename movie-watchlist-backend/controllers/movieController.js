const asyncHandler = require("express-async-handler");
const movieSchema = require("../models/movieSchema");
const mongoose = require("mongoose");
const { buildMovieFilter } = require("../utils/MovieFilter");

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET: List all movies with pagination and filters
const getAllMovies = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const filter = buildMovieFilter(req.query); // Use the external filter function
  const skip = (page - 1) * limit;

  try {
    const movies = await movieSchema
      .find(filter)
      .skip(skip)
      .limit(Number(limit));
    const total = await movieSchema.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies.", error });
  }
});

// GET: Get a specific movie by ID
const getMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid movie ID format." });
  }

  try {
    const movie = await movieSchema.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movie details.", error });
  }
});

// POST: Create a new movie
const createMovie = asyncHandler(async (req, res) => {
  const { title, releaseYear, genres, watched = false, rating } = req.body;

  // Validation
  if (!title || !releaseYear || !genres || genres.length === 0) {
    return res.status(400).json({
      message: "Title, release year, and at least one genre are required.",
    });
  }

  try {
    const newMovie = new movieSchema({
      title,
      releaseYear,
      genres,
      watched,
      rating: watched ? rating : null, // Set rating only if watched
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: "Failed to create movie.", error });
  }
});

// PATCH: Update movie details by ID (partial update)
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { watched, rating } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid movie ID format." });
  }

  // Ensure rating is between 1 and 5 if watched is true
  if (watched && (rating < 1 || rating > 5)) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    const movie = await movieSchema.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    // Update movie details
    movie.watched = watched !== undefined ? watched : movie.watched;
    movie.rating = watched ? rating || movie.rating : 1; // Default rating when unwatched to 1

    const updatedMovie = await movie.save();
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: "Failed to update movie.", error });
  }
});

// DELETE: Remove a movie by ID
const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid movie ID format." });
  }

  try {
    const movie = await movieSchema.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    await movie.remove();
    res.status(200).json({ message: "Movie removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove movie.", error });
  }
});

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
