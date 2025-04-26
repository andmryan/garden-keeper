const mongoose = require("mongoose");

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
});

const User = mongoose.model("User", userSchema);
  
module.exports = User;