const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Import routes
const route = require('./routes/Route.js');

// Middleware setup
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Database connection URI and port configuration
const dbURI = 'mongodb://localhost:27017/assignment';
const PORT = process.env.PORT || 8888;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

connectDB();

// Route handling
app.use('/', route);

// 404 error handling
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
