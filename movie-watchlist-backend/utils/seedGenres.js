const genreSchema = require("../models/genreSchema");

const seedGenres = async () => {
  const genreCount = await genreSchema.countDocuments();

  // If no genres exist, insert predefined genres
  if (genreCount === 0) {
    await genreSchema.insertMany([
      { name: "Action" },
      { name: "Comedy" },
      { name: "Drama" },
      { name: "Horror" },
      { name: "Romance" },
      { name: "Sci-Fi" },
      { name: "Thriller" },
    ]);
    console.log("Genres have been seeded successfully.");
  } else {
    console.log("Genres already exist, skipping seeding.");
  }
};

module.exports = seedGenres;
