// Server configuration

const express = require('express'); 
const bodyParser = require('body-parser');

const port = 3001;
const hostname = '127.0.0.1';

// Use express and bodyparser
const app = express();
app.use(bodyParser.json());

// Use REST style
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routes
/*
All the routes will be here
*/

// Start server
app.listen(port, hostname, () => {
    console.log(`Server for social-media-app is running at http://${hostname}:${port}/`);
});