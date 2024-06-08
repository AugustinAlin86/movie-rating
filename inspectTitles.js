const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Movie = require('./models/movieModel');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected...');
    return Movie.find({}, { title: 1 });
  })
  .then(movies => {
    movies.forEach(movie => {
      console.log(`Title: '${movie.title}'`);
    });
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
