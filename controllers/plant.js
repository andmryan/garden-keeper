const express = require("express");
const router = express.Router();

const Plant = require("../models/plant.js");
const Garden = require("../models/garden.js")

// GET Routes
router.get("/:userId", async (req, res) => {
    // Show the users plants on plant index
    const allPlants = await Plant.find();
    res.render("plants/plantIndex.ejs", { plants : allPlants });
});

router.get("/:userId/newplant", async (req, res) => {
    // show the new plant form
    res.render("plants/plantNew.ejs", );
});

router.get("/:userId/:plantId", async (req, res) => {
    // get a specific plant from their id
    const thisPlant = await Plant.findById(req.params.plantId);
    // get the garden that the plant is housed in.
    res.render("plants/plantView.ejs", { plant : thisPlant });
});

router.get("/edit/:userId/:plantId", async (req, res) => {
    // show the edit form for a specific plant, filled with the plant's current info
        // get the plant's current info
    const thisPlant = await Plant.findById(req.params.plantId);
        // render the page with the specific plant selected
    res.render("plants/plantEdit.ejs", { plant : thisPlant});
});

// Delete Route
router.delete("/:plantId", async (req, res) => {
    // find the correct plant + delete it
    await Plant.findByIdAndDelete(req.params.plantId);
    // return the user to their plant Index
    res.redirect(`/plants/${req.session.user._id}`);
});

// Put Route
router.put("/:userId/:plantId", async (req, res) => {
        // find the plant by Id and update it with the new information.
    await Plant.findByIdAndUpdate(req.params.plantId, req.body);
        // redirect to the plant's page
    const thisPlant = await Plant.findById(req.params.plantId);
        res.render("plants/plantView.ejs", { plant : thisPlant })
});

// Post Routes
// To Do: Add a route for /:plantId for the use case of another user looking at someone else's plant.

module.exports = router;