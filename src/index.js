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

const Post = require('./models/post.js');

const url = process.env.MONGOLAB_URI;
const port = 9000;

const app = express();
// read posts with Content-Type: application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routing
app.get('/', function(request, response) {
    response.json('You did it!');
});

app.get('/api/posts', function(request, response) {
    Post.find().then(posts => {
        response.json({posts});
    });
});

app.post('/api/posts', function(request, response) {

    console.log(`request.body is ${request.body}`);  // undefined

    Post.create({
        user: request.body.user,
        created: Date.now(),
        title: request.body.title,
        description: request.body.description,
        tags: request.body.tags,
        content: request.body.content,
    }).then(post => {
        response.json(post);
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
app.listen((process.env.PORT || port), function() {
    console.log(`Listening to port ${(process.env.PORT || port)}`);  // non-blocking :3
});