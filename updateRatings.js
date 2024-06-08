const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Movie = require('./models/movieModel');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected...');
    return Movie.updateMany(
      { rating: { $exists: false } }, // Only update documents where the rating field does not exist
      { $set: { rating: 5 } } // Set the default rating to 5
    );
  })
  .then(result => {
    console.log(`Updated ${result.nModified} documents`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
