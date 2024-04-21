// Server configuration

const express = require('express');
const bodyParser = require('body-parser');

const port = 3001;
const hostname = '127.0.0.1';

// Use express and bodyparser
const app = express();
app.use(bodyParser.json());

// Allowed methods and headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
    next();
});

// This is for dev purposes only. Logs details each request and makes the server wait for 1 second
// before proceeding.
/*
app.use(async (req, res, next) => {
    console.log(`New request to ${req.url}, parameters ${JSON.stringify(req.params)}, body ${JSON.stringify(req.body)}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    next()
});
*/

// Routes
const userRoutes = require('./routes/user-routes.js');
app.use(userRoutes);

const loginRoutes = require('./routes/login-routes.js');
app.use(loginRoutes);

const postRoutes = require('./routes/post-routes.js');
app.use(postRoutes);

// Start server
const server = app.listen(port, () => {
    console.log(`Server for social-media-app is running at http://${hostname}:${port}/`);
});

module.exports = server;