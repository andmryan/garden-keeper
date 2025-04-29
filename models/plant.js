const mongoose = require("mongoose");
const { Schema } = mongoose;

const plantSchema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    home: { type: Schema.Types.ObjectId, ref: "Garden" },
    species: {type: String, required: true},
    nickname: {type: String},
    description: {type: String},
    imageURL: {type: String},
    needsPrune: {
        type: String,
        enum: ["yes", "no", "notApplicable"],
        required: true,
    },
    needsWater: {
        type: String,
        enum: ["yes", "no", "notApplicable"],
        required: true,
    },
    needsFertilizer: {
        type: String,
        enum: ["yes", "no", "notApplicable"],
        required: true,
    },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;