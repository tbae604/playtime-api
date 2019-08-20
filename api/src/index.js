/*
Welcome to my simple server-side app for the API

Inspired by @ethan.jarrell
https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032
*/
const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const parseUrl = require('parseurl');
const path = require('path');

const Comment = require('./models/comment.js');

const url = 'mongodb://localhost:27017/comments';
const port = 9000;

const app = express();
// read posts with Content-Type: application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routing
app.get('/', function(request, response) {
    response.json('You did it!');
});

app.get('/api/comments', function(request, response) {
    Comment.find().then(comments => {
        response.json({comments});
    });
});

app.post('/api/comments', function(request, response) {

    console.log(`request.body is ${request.body}`);  // undefined

    Comment.create({
        created: Date.now(),
        user: request.body.user,
        message: request.body.message,
    }).then(comment => {
        response.json(comment);
    });
});


// Mongoose connection
mongoose.connect(url, { useNewUrlParser: true }, function(error, db) {
    if (error) {
        console.log(`Cannot connect to mongoDB server: ${error}`);
    } else {
        console.log(`Connected to ${url}`);
    }
});


// Set up app listener
app.listen(port, function() {
    console.log(`Listening to port ${port}`);  // non-blocking :3
});