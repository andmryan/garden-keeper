const mongoose = require("mongoose");

// Imports
const {gardenSchema} = require("./garden.js");

const userSchema = new mongoose.Schema({
    // Base User Schema
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Embedded Schemas
    Gardens: [gardenSchema],
});

const User = mongoose.model("User", userSchema);
  
module.exports = User;