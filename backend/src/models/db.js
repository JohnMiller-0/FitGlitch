/*
    @File: db.js
    @Project: FitGlitch
    @Purpose: This file is responsible for connecting to the MongoDB database using Mongoose.
    @Author: John Miller
    @Date: 2025-05
    @Dependencies: mongoose, readline
    @Description: 
        - Builds the MongoDB connection URI from environment or defaults to localhost.
        - Connects to the MongoDB database with a timeout.
        - Logs connection events (connected, error, disconnected).
        - Handles graceful shutdown for nodemon restarts, app termination, and container shutdowns.
        - Includes a Windows-specific workaround for handling SIGINT signals properly.
    @Reference: 
        Das, A. (2021, June 26). *How to gracefully shutdown an Express.js application in production*. Medium.
        https://article.arunangshudas.com/how-to-gracefully-shutdown-an-express-js-application-in-production-b87e542d2163
*/

const mongoose = require('mongoose');
const readline = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/fitglitch`;

// Build the connection string and set the connection timeout (in ms)
const connect = () => {
  setTimeout(() => {
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
  }, 1000);
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