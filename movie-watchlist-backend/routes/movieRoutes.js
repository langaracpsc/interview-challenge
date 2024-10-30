// routes/movieRoutes.js

const express = require("express");
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController"); // Import all controllers
const router = express.Router();

// GET: List all movies with pagination and filters
router.get("/", getAllMovies);

// GET: Get details of a specific movie by ID
router.get("/:id", getMovieById);

// POST: Create a new movie
router.post("/", createMovie);

// PUT: Update movie details by ID
router.put("/:id", updateMovie);

// DELETE: Remove a movie by ID
router.delete("/:id", deleteMovie);

module.exports = router;
