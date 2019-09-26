/*
Welcome to my simple server-side app for the API

Inspired by @ethan.jarrell
https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032

and Adnan Rahic
https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
*/
const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const parseUrl = require('parseurl');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/user.js');
const Post = require('./models/post.js');

// const url = "mongodb://localhost:27017/playtime";
const url = process.env.MONGOLAB_URI;
const secret = process.env.SECRET;
const port = 9000;

const app = express();
// read posts with Content-Type: application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function verifyToken(request, response, next) {
    let token = request.headers['x-access-token'];
    
    if (!token) {
        return response.status(403).send({
            auth: false,
            message: 'No token provided.',
        });
    }

    jwt.verify(token, secret, function(error, decoded) {
        if (error) {
            return response.status(500).send({
                auth: false,
                message: 'Failed to authenticate token',
            })
        } else {
            request.userId = decoded.id;  // so the next() has it
            next();
        }
    });
}


// Routing
app.get('/', function(request, response) {
    response.json('You did it!');
});

/*
User stuff
*/
app.post('/api/login', function(request, response) {
    User.findOne({ name: request.body.name }, function(error, user) {
        if (error) {
            return response.status(500).send("There was a problem with login.");
        }
        if (!user) {
            return response.status(404).send("No user found with that name.");
        }

        let passwordIsValid = bcrypt.compareSync(request.body.password, user.password);
        if (!passwordIsValid) {
            return response.status(401).send({ auth: false, token: null});
        }

        let token = jwt.sign(
            { id: user._id },
            secret,
            { expiresIn: 86400 }  // 24 hours
        );
        response.status(200).send({ auth: true, token: token });
    });
});

// Not necessary tbh
app.get('/api/logout', function(request, response) {
    response.status(200).send({ auth: false, token: null });
});

app.post('/api/register', function(request, response) {
    let hashedPassword = bcrypt.hashSync(request.body.password, 8);

    User.create({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword
    }).then(user => {
        let token = jwt.sign(
            {id: user._id},
            secret,
            {expiresIn: 86400}  // 24 hours
        );
        response.status(200).send({auth: true, token: token});

    }).catch(error => {
        response.status(500).send("There was a problem with registration.");
    });
});

app.get('/api/users', verifyToken, function(request, response, next) {
    // projection so password not returned
    User.find({}, {password: 0}, function (error, users) {
        if (error) {
            return response.status(500).send("There was a problem retrieving that user.");
        }
        if (!users) {
            return response.status(404).send("No user found.");
        }
        response.json({users});
    });
});

/*
Post stuff
*/
app.get('/api/posts', verifyToken, function(request, response, next) {
    Post.find(function (error, posts) {
        if (error) {
            return response.status(500).send("There was a problem retrieving all posts.");
        }
        if (!posts) {
            return response.status(404).send("No posts found.");
        }
        response.json({posts});
    });
});

app.post('/api/posts', verifyToken, function(request, response, next) {
    Post.create({
        user: request.body.user,
        created: Date.now(),
        title: request.body.title,
        description: request.body.description,
        tags: request.body.tags,
        content: request.body.content,
    }, function(error, post) {
        if (error) {
            return response.status(500).send("There was a problem submitting that post.");
        }
        if (!post) {
            return response.status(404).send("No post found!");
        }
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
    console.log(`Listening to port ${(process.env.PORT || port)}`);
});