const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: String,
    created: { type: Date, default: Date.now() },
    message: String,
}, {collection: 'guest_comments'});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;