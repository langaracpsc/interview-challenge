const asyncHandler = require("express-async-handler");
const movieSchema = require("../models/movieSchema");
const mongoose = require("mongoose");

// GET: List all movies with pagination and filters
const getAllMovies = asyncHandler(async (req, res) => {
  const { genre, watched, rating, page = 1, limit = 10 } = req.query;

  // Validate input data
  if (limit <= 0 || page <= 0) {
    return res.status(400).json({ message: "Page and limit must be positive integers." });
  }

  const filter = {};
  if (genre) filter.genres = genre;
  if (watched !== undefined) filter.watched = watched === "true";
  if (rating) {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }
    filter.rating = rating;
  }

  const skip = (page - 1) * limit;

  try {
    const movies = await movieSchema.find(filter).skip(skip).limit(Number(limit));
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

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
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
  const { title, releaseYear, genres, watched, rating } = req.body;

  if (!title || !releaseYear || !genres || genres.length === 0) {
    return res.status(400).json({
      message: "Title, release year, and at least one genre are required.",
    });
  }

  // Check if rating is valid
  if (watched && (rating < 1 || rating > 5)) {
    return res.status(400).json({
      message: "If the movie is marked as watched, rating must be between 1 and 5.",
    });
  }

  try {
    const existingMovie = await movieSchema.findOne({ title, releaseYear });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie already exists in the watchlist." });
    }

    const newMovie = new movieSchema({
      title,
      releaseYear,
      genres,
      watched: watched || false,
      rating: watched ? rating : null,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: "Failed to create movie.", error });
  }
});

// PUT: Update movie details by ID
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, releaseYear, genres, watched, rating } = req.body;

  console.log("Received update request for movie ID:", id);
  console.log("Update data:", req.body);

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid movie ID format." });
  }

  // Check if rating is valid
  if (watched && (rating < 1 || rating > 5)) {
    return res.status(400).json({
      message: "If the movie is marked as watched, rating must be between 1 and 5.",
    });
  }

  try {
    const movie = await movieSchema.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    // Log the current movie details
    console.log("Current movie details:", movie);

    // Update movie details
    movie.title = title || movie.title;
    movie.releaseYear = releaseYear || movie.releaseYear;
    movie.genres = genres || movie.genres;
    movie.watched = watched !== undefined ? watched : movie.watched;
    movie.rating = watched && rating ? rating : movie.rating;

    const updatedMovie = await movie.save();

    // Log the updated movie details
    console.log("Updated movie details:", updatedMovie);

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Failed to update movie.", error });
  }
});
// DELETE: Remove a movie by ID
const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
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
