const asyncHandler = require("express-async-handler");
const genreSchema = require("../models/genreSchema");

// GET: List all genres
const getGenres = asyncHandler(async (req, res) => {
  try {
    const genres = await genreSchema.find();
    if (genres.length === 0) {
      return res.status(404).json({ message: "No genres found." });
    }
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch genres.", error });
  }
});

module.exports = { getGenres };
