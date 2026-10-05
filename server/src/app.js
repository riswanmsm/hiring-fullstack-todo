const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes will be mounted here in Hour 3

module.exports = app;