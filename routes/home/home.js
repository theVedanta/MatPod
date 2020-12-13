const express = require("express");
const router = express.Router();
const qao = require("../bank/bank");
const methodOverride = require("method-override")

router.use(methodOverride("_method"));

router.get("/", (req, res) => {
    res.render("home", {
        nick: req.user.nick,
        genres: Object.keys(qao)
    });
});

router.post("/", (req, res) => {
    let genre = req.body.genre;
    module.exports.genre = genre;
    res.redirect("/quiz");
});

router.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});

module.exports.router = router;
