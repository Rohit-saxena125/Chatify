const mongoose = require('mongoose');
const comment = new mongoose.Schema({
    uID: String,
    email: String,
    username: String,
    comment: String,
    Date: {
        type: Date,
        default: Date.now,
    },
});
const like = new mongoose.Schema({
    uID: String,
    email: String,
    username: String,
});
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: [like],
    comments: [comment],
    Date: {
        type: Date,
        default: Date.now,
    },
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;