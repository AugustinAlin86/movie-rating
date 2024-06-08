const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGO_URI:', process.env.MONGO_URI); // Log to ensure MONGO_URI is loaded

async function testConnection() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MongoDB connection error: MONGO_URI is not defined in .env file.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    mongoose.connection.close();
  }
}

testConnection();

