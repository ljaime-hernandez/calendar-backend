const express = require('express');
require('dotenv').config();

console.log(process.env);

//creates express server
const app = express();

// Public Directory
app.use(express.static('public'));

// parsing and lecture of body post
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
// auth // create, login, renew
// crud 

// listens petitions
app.listen( process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});