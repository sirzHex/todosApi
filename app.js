const express = require('express');
const app = express();
const mongoose = require('mongoose');

// import middleware
const bodyParser = require('body-parser');
const cors = require('cors');

// register middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// import routers
const userRouter = require('./todo.router');

//register routers
app.use('/todo', userRouter);
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB = process.env.DB || '';

mongoose.connect(DB, { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err);
    app.listen(PORT, () => {
        console.log(`server started at ${PORT}`);
    })
});
