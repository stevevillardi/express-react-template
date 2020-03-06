const express = require("express");

const mongoose = require("mongoose");
const session = require("express-session");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const passport = require("passport");
require("dotenv").config();
require("./passport");

app.use(
    session({ secret: "mail-mover", resave: true, saveUninitialized: true })
);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

// Connect to the Mongo DB
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/mail_mover", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(console.log("Connect to MongoDB"))
    .catch(err => {
        console.log(err);
    });

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
