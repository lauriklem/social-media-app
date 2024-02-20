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
const userRoutes = require('./routes/user-routes.js');
app.use(userRoutes);

const loginRoutes = require('./routes/login-routes.js');
app.use(loginRoutes);

// Start server
const server = app.listen(port, hostname, () => {
    console.log(`Server for social-media-app is running at http://${hostname}:${port}/`);
});

module.exports = server;