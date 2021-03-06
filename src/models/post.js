const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    created: { type: Date, default: Date.now() },
    title: String,
    description: String,
    tags: [String],
    content: String,
}, {collection: 'posts'});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;