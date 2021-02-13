const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const server = require("http").Server(app);
const port = process.env.PORT || 8080;
const createError = require("http-errors");
require("dotenv").config();
const session = require('express-session')
const flash = require('connect-flash');
const { connect } = require("http2");

// ###### Path ######
const static_path = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ###### Set EJS Engine ######
app.set("view engine", "ejs");
app.set("views", viewsPath);

// Init Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: true, //For HTTPS Only
        httpOnly: true,
        // sameSite: 'strict'
    }
}));

// Flash Messages
app.use(flash());
// This is For Redirect Flash Messages
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
})


// Index Route
app.use("/", require("./routers/index.route"));
// Auth Route
app.use("/auth", require("./routers/auth.route"));

app.get("/room/:room", (req, res) => {
    res.render("room", {
        roomId: req.params.room,
    });
});

// Http-Errors
app.use((req, res, next) => {
    next(createError.NotFound());
});
app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.render("error_40x", {
        error
    });
    res.send(error);
});

// Database Conn
// require('./db/conn');
const mongooseURL = process.env.DB_URL;
const mongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || mongooseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("Database Successfully Connected!!");

        server.listen(port, () => {
            console.log(`App is Running On http://localhost:${port}`);
        });
    } catch (error) {
        throw error;
    }
};
mongooseConnect();
