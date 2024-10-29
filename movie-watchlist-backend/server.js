// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./database/db");
const app = express();

// Load environment variables from .env file
dotenv.config();
// Connect to MongoDB
connectDb();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up a basic route to test the API
app.get("/", (req, res) => {
  res.send("Movie Watchlist API");
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
