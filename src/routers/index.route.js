const express = require('express');
//  Create a new router 
const router = new express.Router();

router.get("/", (req, res, next) => {
    res.render("index")
})

module.exports = router;