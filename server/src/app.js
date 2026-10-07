const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/todos', todoRoutes);

// Centralized error handler
app.use(errorHandler);

module.exports = app;