/**
 * @file db.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Handles MongoDB connection and graceful shutdown with Mongoose.
 */

const mongoose = require('mongoose');
const readline = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/fitglitch`;

// Connect to MongoDB
// Use the MongoDB URI from environment variables or default to localhost
const connect = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
  } catch (err) {
    console.error('Initial MongoDB connection error:', err);
  }
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific SIGINT listener
if (process.platform === 'win32') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Configure for graceful shutdown
const gracefulShutdown = async (msg) => {
  try {
    await mongoose.connection.close();
    console.log(`MongoDB disconnected through ${msg}`);
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB shutdown:', err);
    process.exit(1);
  }
};

// Signal event listeners
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart').then(() => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination');
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
});

// Make initial connection to DB
connect();

module.exports = mongoose;