const express = require('express');
const { connection } = require('./db/config');
const cors = require('cors');
require('dotenv').config();

//creates express server
const app = express();

// database connection
connection();

app.use(cors());

// Public Directory
app.use(express.static('public'));

// parsing and lecture of body post
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// listens petitions
app.listen( process.env.PORT || 5000, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});