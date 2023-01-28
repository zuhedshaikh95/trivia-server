const express = require("express");
const Question = require("../models/question.model");

const app = express.Router();

app.get('/', async (request, response) => {
    const { category, difficulty, limit } = request.query;

    try {
        const questions = await Question.find({ $and: [{ category }, { difficulty }] }).limit(limit)
        return response.send(questions);
    }
    catch({ message }) {
        return response.send({
            error: true,
            message
        })
    }
});

module.exports = app;