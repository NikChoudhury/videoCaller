const express = require("express");
const User = require("../models/user.model");
const router = new express.Router();

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
