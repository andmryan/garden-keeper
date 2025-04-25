const mongoose = require("mongoose");
const {plantSchema} = require("./plant.js");

const gardenSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    location: {
        type: String,
        enum: ["Indoor", "Outdoor"],
        required: true,
    },
    imageURL: {type: String},
    plants: [plantSchema],
});

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = {
    Gardens: Garden,
    gardenSchema: gardenSchema,
};