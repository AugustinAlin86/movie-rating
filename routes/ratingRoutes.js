const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');

// Update movie rating
router.post('/rate', async (req, res) => {
  const { title, userRating, comment } = req.body;
  console.log(`Received request to rate movie: ${title} with rating: ${userRating} and comment: ${comment}`);
  
  try {
    const escapedTitle = title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    console.log(`Looking for movie with title: ${escapedTitle}`);
    const movie = await Movie.findOne({ title: { $regex: new RegExp(`^${escapedTitle}$`, 'i') } });
    if (!movie) {
      console.log('Movie not found with title:', title);
      return res.status(404).json({ message: 'Movie not found' });
    }

    const newRating = (movie.rating + userRating) / 2;
    movie.rating = newRating;

    if (comment) {
      movie.comments = movie.comments || [];
      movie.comments.push({ text: comment });
    }

    await movie.save();
    console.log(`Updated rating for movie: ${movie.title} to ${movie.rating}`);
    res.json({ message: 'Rating updated successfully', newRating: movie.rating });
  } catch (err) {
    console.error('Server error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
