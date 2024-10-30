const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./database/db");
const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genreRoutes");
const seedGenres = require("./utils/seedGenres");
const app = express();

const cors = require('cors');
app.use(cors());  // Enable CORS for all routes

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDb();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Set up a basic route to test the API
app.get("/", (req, res) => {
  res.send("Movie Watchlist API");
});

// Route handling
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/genres", genreRoutes);

// Seed genres after the DB connection
const startServer = async () => {
  try {
    await connectDb(); // Connect to MongoDB
    await seedGenres(); // Seed predefined genres if they don't already exist

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process if there's an error
  }
};

// Call the function to start the server
startServer();
