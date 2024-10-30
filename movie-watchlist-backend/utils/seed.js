// seed.js

const mongoose = require("mongoose");
const Movie = require("../models/movieSchema");
const Genre = require("../models/genreSchema");
const connectDb = require("../database/db");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();
// Sample Movies and Genres Data
const sampleMovies = [
  {
    title: "Inception",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi"],
    watched: true,
    rating: null,
  },
  {
    title: "The Godfather",
    releaseYear: 1972,
    genres: ["Drama", "Crime"],
    watched: true,
    rating: null,
  },
  {
    title: "Interstellar",
    releaseYear: 2014,
    genres: ["Adventure", "Sci-Fi"],
    watched: true,
    rating: null,
  },
  {
    title: "The Dark Knight",
    releaseYear: 2008,
    genres: ["Action", "Drama"],
    watched: true,
    rating: null,
  },
];

const sampleGenres = [
  { name: "Action" },
  { name: "Comedy" },
  { name: "Drama" },
  { name: "Horror" },
  { name: "Romance" },
  { name: "Sci-Fi" },
  { name: "Thriller" },
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await connectDb();

    // Clear existing data
    await Movie.deleteMany({});
    await Genre.deleteMany({});

    // Insert sample data
    await Genre.insertMany(sampleGenres);
    await Movie.insertMany(sampleMovies);

    console.log("Sample data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedData();
