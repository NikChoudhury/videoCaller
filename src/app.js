const express = require("express");
const app = express();
const ejs = require("ejs")
const path = require('path');
const port = process.env.PORT || 8080;

// ###### Path ######
const static_path = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// ###### Set EJS Engine ######
app.set("view engine", "ejs");
app.set("views", viewsPath);
app.get("/", (req, res) => {
    res.render("index")
})
app.listen(port)