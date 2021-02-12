const express = require("express");
const app = express();
const ejs = require("ejs")
const path = require('path');
const server = require('http').Server(app)
const createError = require('http-errors')
require('dotenv').config();
require('./db/conn');

// ###### Path ######
const static_path = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));

app.use(express.urlencoded({ extended: false }));

// Http-Errors
app.use((req, res, next) => {
    next(createError.NotFound())
});
app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.send(error)
})
// ###### Set EJS Engine ######
app.set("view engine", "ejs");
app.set("views", viewsPath);


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/room/:room", (req, res) => {
    res.render("room", {
        roomId: req.params.room,
    })
})

//Router
const router = require("./routers/router");
app.use(router);





