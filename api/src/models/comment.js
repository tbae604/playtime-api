const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const commentSchema = new Schema({
    guest_comment: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    // message: {
    //     type: mongoose.Schema.Types.Mixed,
    //     required: true,
    // }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;