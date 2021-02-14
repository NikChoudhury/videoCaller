const express = require("express");
//  Create a new router
const router = new express.Router();

router.get("/profile", (req, res, next) => {
  const person = req.user;
  res.render("profile", { person });
});

module.exports = router;
