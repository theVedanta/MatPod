if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};
// MODULES
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");

// SETTINGS
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
// Home
app.use("/home", checkAuthenticated, require("./routes/home/home").router);

// Landing
app.get("/", (req, res) => {
    res.render("index")
});

// Auth
app.use("/auth/login", checkNotAuthenticated, require("./routes/auth/login"));
app.use("/auth/register", checkNotAuthenticated, require("./routes/auth/register"));

// Quiz
app.use("/quiz", checkAuthenticated, require("./routes/quiz/quiz"))

// Pods
app.use("/pods", checkAuthenticated, require("./routes/pods/pod"));

// MIDDLEWARE
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/auth/login")
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/home");
    }
    next();
}

// LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
