require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = 8080;
const connect = require('./configs/db');

const app = express();

const userRoute = require('./routes/user.route');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', userRoute);

app.get('/', (request, response) => {
    return response.send('Hello, Topper!');
});

app.listen(PORT, async () => {
    try {
        await connect();
        console.log(`Listening at http://localhost:${PORT}`);
    }
    catch({message}) {
        console.log(message);
    }
})