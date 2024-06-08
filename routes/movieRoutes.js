const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');

// Get movies by title or genre
router.get('/', async (req, res) => {
  const { title, genre } = req.query;
  let query = {};

  if (title) {
    query.title = { $regex: title, $options: 'i' }; // case-insensitive search
  }

  if (genre) {
    query.genres = { $regex: genre, $options: 'i' }; // case-insensitive search
  }

  try {
    const movies = await Movie.find(query);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
