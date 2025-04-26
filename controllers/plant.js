const express = require("express");
const router = express.Router();

const Plant = require("../models/plant.js");

// Routing for plant viewing. No need for a /:userId/:plantId because you will always click a plant from the garden page.
router.get("/:userId/:gardenId/newPlant", (req, res) => {
    res.render("gardens/plantNew.ejs");
});

router.get("/:userId/:gardenId/:plantId", (req, res) => {
    res.render("gardens/plantView.ejs");
});

router.get("/:userId/:userId/:gardenId/edit", (req, res) => {
    res.render("gardens/plantEdit.ejs");
});

router.get("/:userId/:gardenId/:plantId/delete", (req, res) => {
    res.render("gardens/gardenIndex.ejs");
});

// To Do: Add a route for /:plantId for the use case of another user looking at someone else's plant.

module.exports = router;