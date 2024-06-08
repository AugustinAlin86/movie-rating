const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  movieId: Number,
  title: String,
  genres: String,
  rating: Number,
  comments: [
    {
      text: String
    }
  ]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

