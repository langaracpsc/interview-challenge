const { mongoose } = require("mongoose");

const connectDb = async () => {
  mongoose
    .connect(
      "mongodb+srv://demiladealuko111:QewgeSscXR0H8TDB@cluster0.i2yza.mongodb.net/movie-wishlist?retryWrites=true&w=majority&appName=Cluster0",
      {}
    )
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = connectDb;
