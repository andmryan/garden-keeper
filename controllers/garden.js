const express = require("express");
const router = express.Router();

const Garden = require("../models/garden.js");

// GET Routes
router.get("/", async (req, res) => {
    // Show the users gardens on garden index
    const allGardens = await Garden.find();
    res.render("gardens/gardenIndex.ejs", { gardens : allGardens });
});

router.get("/garden/new", (req, res) => {
    // show the new garden form
    res.render("gardens/gardenNew.ejs");
});

router.get("/view/:gardenId", (req, res) => {
    // show a specific garden from their id
    res.render("gardens/gardenView.ejs");
});

router.get("/edit/:gardenId", async (req, res) => {
    // show the edit form for a specific garden, filled with the garden's current info
        // get the garden's current info
    const thisGarden = await Garden.findbyId(req.params.gardenId);
        // render the page with the specific garden selected
    res.render("gardens/gardenEdit.ejs", { garden : thisGarden});
});

// Delete Route
router.delete("/delete/:gardenId", async (req, res) => {
    res.redirect(`/gardens/${req.session.user._id}`);
});

// Put Route
router.put("/:userId/:gardenId", async (req, res) => {
    // put the changes from the garden edit form to the correct garden
        // find the garden by Id and update it with the new information.
    await Garden.findbyIdAndUpdate(req.params.gardenId, req.body);
});

// Post Routes
router.post("/:userId", async (req, res) => {
    // post the filled new garden form
        // wait for the body to be made and then post it to the correct page
    await Garden.create(req.body);
        // redirect to the user's garden index
    res.redirect(`/gardens/${req.session.user._id}`);
});

// To Do: Add a route for /:gardenId for the use case of another user looking at someone else's plant.

module.exports = router;