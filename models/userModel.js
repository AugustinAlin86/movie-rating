const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user'], default: 'user' }
});

const User = mongoose.model('User', userSchema, 'user'); // Explicitly set collection name

module.exports = User;
