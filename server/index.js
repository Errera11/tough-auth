require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/appRoutes');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = 5000 || process.env.PORT;
const dbUrl = process.env.db;
const app =  express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(dbUrl)
        app.listen(PORT, () => console.log("Started with " + PORT));
    } catch(e) {
        console.log("start app error " + e);
    }
}

start();