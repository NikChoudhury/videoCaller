const express = require('express');
const app = express();

//  Create a new router 
const router = new express.Router();

// Controllers
const userController = require('../controllers/user.controller');


router.get("/signin", (req, res) => {
    res.render("signin")
})
router.get("/signup", (req, res) => {
    res.render("signup")
})


// Create a New User
router.post("/signup", userController.userRegistration);
module.exports = router;