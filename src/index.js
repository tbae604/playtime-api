/*
API Starting point
*/

const mongoose = require('mongoose');
const { app } = require('./app.js');

// const url = "mongodb://localhost:27017/playtime";
const url = process.env.MONGOLAB_URI;
const port = 9000;

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
