const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
}, {collection: 'playtime_posts'});

const User = mongoose.model('User', userSchema);
module.exports = User;