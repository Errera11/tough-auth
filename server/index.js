require('dotenv').config();
const express = require('express');

const PORT = 5000 || process.env.PORT;
const app =  express();

//middlewares
app.use(express.json());

const start = () => {
    try {
        app.listen(PORT, () => console.log("Started with " + PORT));
    } catch(e) {
        console.log("start app error " + e);
    }
}

start();