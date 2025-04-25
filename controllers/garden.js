const express = require("express");
const router = express.Router();


const User = require("../models/user.js");
const Garden = require("../models/garden.js")
const Plant = require("../models/plant.js");

const currentUser = User._id;



router.get("/:userId", (req, res) => {
    res.render("gardens/gardenIndex.ejs");
});

module.exports = router;