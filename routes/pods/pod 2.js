const express = require("express");
const router = express.Router();
var pods = require("./usrPods");
const methodOverride = require("method-override");

var firstQues = true;
var qao = {};
let addGenre = "";
let quesDone = 1;

router.use(methodOverride("_method"));

// GET
router.get("/", (req, res) => {
    let genres = Object.keys(pods);
    firstQues = true;
    res.render("pods", {
        genres: genres,
        nick: req.user.nick
    });
});

// ADD
router.get("/add", (req, res) => {
    res.render("add", {
        firstQues: firstQues,
        quesDone: quesDone
    });
});

router.post("/add", (req, res) => {

    const body = req.body;
    let ques = body.question;
    let opts = body.option;
    let sub = body.sub;
    if (firstQues) {
        addGenre = body.genre;
    };
    qao[`${ques}`] = opts;

    if (sub == "done"){
        pods[`${addGenre}`] = qao;
        qao = {};
        quesDone = 1;
        res.redirect("/pods");
    } else {
        quesDone++
        firstQues = false;
        res.redirect("/pods/add");
    }
});

// EDIT

router.get("/edit/:genre", (req, res) => {
    let genre = req.params.genre;
    let quiz = pods[genre];
    let quess = Object.keys(quiz);
    let optss = Object.values(quiz);
    anss = [];
    for (let opts of optss) {
        anss.push(opts[0])
    };

    res.render("edit", {
        genre: genre,
        quess: quess,
        optss: optss,
        anss: anss,
    });
});

router.put("/edit/:genre", (req, res) => {
    qao = {};
    let keys = Object.keys(req.body);
    let vals = Object.values(req.body);
    for (let i = 0; i < (keys.length); i++) {
        if (i % 2 === 0) {
            qao[vals[i]] = vals[i + 1];
        };
    };
    let genre = req.params.genre;
    pods[genre] = qao;
    qao = {};
    res.redirect("/pods");
});

// DELETE
router.delete("/delete/:genre", (req, res) => {
    let genre = req.params.genre;
    delete pods[genre];
    res.redirect("/pods");
});

module.exports = router;
