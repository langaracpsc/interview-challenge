const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./database/db");
const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genreRoutes");
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form URL-encoded bodies

// Connect to MongoDB
connectDb();

// Routes
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/genres", genreRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
