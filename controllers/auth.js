const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.js");

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/sign-up", async (req, res) => {
  try {
    const uniqueCheck = await User.findOne({ username: req.body.username });
    if (uniqueCheck) {
      return res.send("Username already taken.");
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Passwords must match.");
    }
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
  
    await User.create(req.body);
  
    res.redirect("/auth/sign-in");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const uniqueCheck = await User.findOne({ username: req.body.username });
    if (!uniqueCheck) {
      return res.send("Login failed, please try again.");
    }
  
    const validPassword = bcrypt.compareSync(
      req.body.password,
      uniqueCheck.password
    );
    if (!validPassword) {
      return res.send("Login failed, please try again.");
    }
  
    req.session.user = {
      username: uniqueCheck.username,
      _id: uniqueCheck._id
    };
  
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
});

module.exports = router;