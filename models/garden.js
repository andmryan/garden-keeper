const mongoose = require("mongoose");
const { Schema } = mongoose;

const gardenSchema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    name: {type: String, required: true},
    description: {type: String, required: true},
    location: {
        type: String,
        enum: ["Indoor", "Outdoor"],
        required: true,
    },
    imageURL: {type: String},
});

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = Garden;