const express = require("express");
const router = express.Router();

const Garden = require("../models/garden.js");
const Plant = require("../models/plant.js");

// GET Routes
router.get("/:userId", async (req, res) => {
    // Show the users gardens on garden index
    const allGardens = await Garden.find();
    res.render("gardens/gardenIndex.ejs", { gardens : allGardens });
});

router.get("/:userId/newgarden", async (req, res) => {
    // show the new garden form
    res.render("gardens/gardenNew.ejs", );
});

router.get("/:userId/:gardenId/newplant", async (req, res) => {
    // get the garden the plant is from
    const housedIn = await Garden.findById(req.params.gardenId);
    // show the new plant form
    res.render("plants/plantNew.ejs", { home : housedIn, garden : housedIn });
});

router.get("/:userId/:gardenId", async (req, res) => {
    // show a specific garden from their id
    const requestedGarden = await Garden.findById(req.params.gardenId);
    const housedPlants = await Plant.find({ home: req.params.requestedGarden });
    res.render("gardens/gardenView.ejs", { garden : requestedGarden, plants : housedPlants });
});

router.get("/edit/:userId/:gardenId", async (req, res) => {
    // show the edit form for a specific garden, filled with the garden's current info
        // get the garden's current info
    const requestedGarden = await Garden.findById(req.params.gardenId);
        // render the page with the specific garden selected
    res.render("gardens/gardenEdit.ejs", { garden : requestedGarden});
});

// Delete Route
router.delete("/:gardenId", async (req, res) => {
    // find the correct garden + delete it
    await Garden.findByIdAndDelete(req.params.gardenId);
    // return the user to their garden Index
    res.redirect(`/gardens/${req.session.user._id}`);
});

// Put Route
router.put("/:userId/:gardenId", async (req, res) => {
        // find the garden by Id and update it with the new information.
    await Garden.findByIdAndUpdate(req.params.gardenId, req.body);
        // redirect to the garden's page
    const requestedGarden = await Garden.findById(req.params.gardenId);
        res.render("gardens/gardenView.ejs", { garden : requestedGarden })
});

// Post Routes
router.post("/:userId", async (req, res) => {
    // post the filled new garden form
        // wait for the body to be made and then post it to the correct page
    await Garden.create(req.body);
        // redirect to the user's garden index
    res.redirect(`/gardens/${req.session.user._id}`);
});

router.post("/:userId/:gardenId/plants", async (req, res) => {
    // Get the garden you're in.
    const requestedGarden = await Garden.findById(req.params.gardenId);
    // Turn the filled new plant form into a const
    await Plant.create(req.body);
    // render the garden page again, this time with the new plant in it.
    res.render("/gardens/gardenView.ejs", { garden : requestedGarden })
});

// To Do: Add a route for /:gardenId for the use case of another user looking at someone else's plant.

module.exports = router;