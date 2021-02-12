const mongoose = require('mongoose');
const express = require("express");
const app = express();
const server = require('http').Server(app)
const port = process.env.PORT || 8080;
const mongooseURL = process.env.DB_URL
const mongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || mongooseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Database Successfully Connected!!")

        server.listen(port, () => {
            console.log(`App is Running On http://localhost:${port}`);
        });

    } catch (error) {
        throw error;
    }
}
mongooseConnect();