const express = require("express");
const User = require("../models/user.model");
const { body, validationResult } = require("express-validator");
//  Create a new router
const router = new express.Router();

router.get("/signup", async (req, res, next) => {
  //   req.flash("info", "Flash is back!");
  //   req.flash("error", "Flash is back Error!");
  //   req.flash("error", "Flash is back Error 2!");
  //   req.flash("key", "Flash is back! Key");
  //   const messages = req.flash();
  // console.log(messages)
  // res.redirect("/auth/signin")
  res.render("signup");
});
router.post(
  "/signup",
  [
    body("username")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Insert a valid Username"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is Not Vaild")
      .normalizeEmail()
      .toLowerCase(),
    body("pass")
      .trim()
      .isLength(2)
      .withMessage("Password length is to Short!!")
      .isStrongPassword()
      .withMessage("Password is not Strong"),
    body("cpass").custom((value, { req }) => {
      if (value !== req.body.pass) {
        throw new Error("Password Do not match!!");
      }
      return true;
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash("error", error.msg);
        });
        res.render("signup", {
          username: req.body.username,
          email: req.body.email,
          messages: req.flash(),
        });
        return;
      }
      const { username, email } = req.body;
      const doesExitUsername = await User.findOne({ username });
      const doesExitEmail = await User.findOne({ email });
      if (doesExitUsername) {
        req.flash("error", "Username is already in Use !!");

        res.render("signup", {
          username: req.body.username,
          email: req.body.email,
          messages: req.flash(),
        });
        return;
      }
      if (doesExitEmail) {
        req.flash("error", "Email is Already Exist !!");
        res.render("signup", {
          username: req.body.username,
          email: req.body.email,
          messages: req.flash(),
        });
        return;
      }
      const user = new User(req.body);
      await user.save();
      req.flash(
        "success",
        ` ${user.email} registered succesfully, You can now login`
      );
      res.redirect("/auth/signin");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/signin", async (req, res, next) => {
  res.render("signin");
});
router.post("/signin", async (req, res, next) => {
  res.send("signin post");
});

router.get("/logout", async (req, res, next) => {
  res.send("signin post");
});
module.exports = router;
