const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' }
});

const Admin = mongoose.model('Admin', adminSchema, 'admin'); // Explicitly set collection name

module.exports = Admin;
