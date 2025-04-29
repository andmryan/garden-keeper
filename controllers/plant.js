const express = require("express");
const router = express.Router();

const Plant = require("../models/plant.js");

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
    // show a specific plant from their id
    const requestedPlant = await Plant.findById(req.params.plantId);
    res.render("plants/plantView.ejs", { plant : requestedPlant });
});

router.get("/edit/:userId/:plantId", async (req, res) => {
    // show the edit form for a specific plant, filled with the plant's current info
        // get the plant's current info
    const requestedPlant = await Plant.findById(req.params.plantId);
        // render the page with the specific plant selected
    res.render("plants/plantEdit.ejs", { plant : requestedPlant});
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
    const requestedPlant = await Plant.findById(req.params.plantId);
        res.render("plants/plantView.ejs", { plant : requestedPlant })
});

// Post Routes
router.post("/:userId", async (req, res) => {
    // post the filled new plant form
        // wait for the body to be made and then post it to the correct page
    await Plant.create(req.body);
        // redirect to the user's plant index
    res.redirect(`/plants/${req.session.user._id}`);
});

// To Do: Add a route for /:plantId for the use case of another user looking at someone else's plant.

module.exports = router;