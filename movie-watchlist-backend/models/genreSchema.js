// models/Genre.js
const mongoose = require('mongoose');

// Genre Schema Definition
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Genre name is required'],
  },
});

// Export the Genre model
module.exports = mongoose.model('Genre', genreSchema);
