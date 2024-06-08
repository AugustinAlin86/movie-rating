const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth'); // Import the auth middleware

// Delete a user
router.delete('/deleteUser', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await User.findOneAndDelete({ email });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a movie
router.post('/addMovie', async (req, res) => {
  const { title, genres } = req.body;
  try {
    const newMovie = new Movie({
      title,
      genres,
      rating: 5  // Default rating
    });
    await newMovie.save();
    res.json({ message: 'Movie added successfully' });
  } catch (err) {
    console.error('Error adding movie:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a movie
router.delete('/deleteMovie', async (req, res) => {
  const { title } = req.body;
  try {
    const result = await Movie.findOneAndDelete({ title: { $regex: new RegExp(title, 'i') } });
    if (!result) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
