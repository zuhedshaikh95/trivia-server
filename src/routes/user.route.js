const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const app = express.Router();

app.get('/', async (request, response) => {
    try {
        const users = await User.find();
        return response.send(users);
    }
    catch ({ message }) {
        return response.send({
            error: true,
            message
        })
    }
});

app.post('/generate-profile', async (request, response) => {
    const { username } = request.body;

    try {
        const user = await User.findOne({ username });
        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        if (user) {
            return response.send({
                error: false,
                message: 'User already exist!',
                user,
                token
            })
        }

        const newUser = new User({ username });
        newUser.save();

        return response.send({
            error: false,
            message: 'Registration successful!',
            user: newUser,
            token
        });
    }
    catch ({ message }) {
        return response.send({
            error: true,
            message
        })
    }
});

app.get('/profile', async (request, response) => {
    const { _id } = request.body;

    try {
        const user = await User.findOne({ _id });

        return response.send({
            error: false,
            user
        })
    }
    catch ({ message }) {
        return response.send({
            error: true,
            message
        })
    }
});

app.patch('/update-score', async (request, response) => {
    const { category, difficulty, score, _id, solved } = request.body;

    try {
        const user = await User.findOne({ _id });
        user.scores.push({
            category,
            difficulty,
            solved,
            score,
            date: new Date()
        });
        user.save();

        user.scores.sort((a,b) => b.score - a.score);
        return response.send({
            error: false,
            message: "Score updated!",
            user
        })
    }
    catch({message}) {
        return response.send({
            error: true,
            message
        })
    }
})


module.exports = app;