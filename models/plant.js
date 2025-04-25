const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    scientificName: {type: String, required: true},
    nickname: {type: String},
    description: {type: String, required: true},
    imageURL: {type: String},
    needsPrune: {
        type: String,
        enum: ["Yes", "No", "notApplicable"],
        required: true,
    },
    needsWater: {
        type: String,
        enum: ["Yes", "No", "notApplicable"],
        required: true,
    },
    needsFertilizer: {
        type: String,
        enum: ["Yes", "No", "notApplicable"],
        required: true,
    },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = {
    Plants: Plant,
    plantSchema: plantSchema,
};