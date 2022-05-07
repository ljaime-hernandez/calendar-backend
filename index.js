const express = require('express');
const { connection } = require('./db/config');
require('dotenv').config();
const cors = require('cors');

//creates express server
const app = express();

// database connection
connection();

app.use(cors())

// Public Directory
app.use(express.static('public'));

// parsing and lecture of body post
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// listens petitions
app.listen( process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});