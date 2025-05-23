const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");

const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

const path = require('path');

const authController = require("./controllers/auth.js");
const gardenController = require("./controllers/garden.js");
const plantController = require("./controllers/plant.js");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
);
  
app.use(passUserToView);

// If they're logged in, send them to their gardens page instead of the front page, otherwise send them to the homepage.
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(`/gardens/${req.session.user._id}`);
  } else {
    res.render("homepage.ejs");
  }
});

app.use("/auth", authController);
app.use(isSignedIn);
app.use("/gardens", gardenController);
app.use("/plants", plantController);

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});