const mongoose = require("mongoose");
const { Schema } = mongoose;

const plantSchema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    inGarden: { type: Schema.Types.ObjectId, ref: "Garden" },
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

module.exports = Plant;