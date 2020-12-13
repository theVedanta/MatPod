const express = require("express");
const router = express.Router();
const passport = require("passport");
let users = require("./users");

// INITIALIZE PASSPORT
const initializePassport = require("./passport-config");
initializePassport(
    passport,
    mail => users.find(user => user.mail === mail),
    id => users.find(user => user.id === id)
);

// SETTINGS
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/auth/login",
    failureFlash: true
}));

// EXPORT
module.exports = router;
