const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    scores: [{
        category: String,
        difficulty: String,
        solved: String,
        score: {
            type: Number,
            default: 0
        },
        date: Date
    }]
}, { versionKey: false });

module.exports = mongoose.model("Users", userSchema,)