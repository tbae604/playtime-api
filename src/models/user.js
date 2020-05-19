const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, {collection: 'users'});

const User = mongoose.model('User', userSchema);
module.exports = User;