const express = require("express");

const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const passport = require("passport"); // at headerapp.use(passport.initialize()); // after line no.20 (express.static)
require("dotenv").config();
require("./passport");

// // cookieSession config
// app.use(
//     cookieSession({
//         maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
//         keys: ["mailmover"]
//     })
// );
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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mail_mover", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
