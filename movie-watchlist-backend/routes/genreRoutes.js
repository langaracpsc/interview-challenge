// routes/genreRoutes.js
const express = require("express");
const { getGenres } = require("../controllers/genreController");
const router = express.Router();

// GET: List all genres
router.get("/", getGenres);

module.exports = router;
