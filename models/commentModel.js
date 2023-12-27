

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "type hier een comentaar"],
    },
    author: {
        type: String,
        required: [true, "geef de naam van author"],
    },
    
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
