const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Garden = require("../models/garden.js")
const Plant = require("../models/plant.js");

router.get("/:userId/:userId", (req, res) => {
    res.render("plants/viewPlant.ejs");
});

module.exports = router;