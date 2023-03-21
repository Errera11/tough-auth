require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/appRoutes');
const cookieParser = require('cookie-parser');

const PORT = 5000 || process.env.PORT;
const dbUrl = process.env.db;
const app =  express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

const start = async () => {
    try {
        await mongoose.connect(dbUrl)
        app.listen(PORT, () => console.log("Started with " + PORT));
    } catch(e) {
        console.log("start app error " + e);
    }
}

start();