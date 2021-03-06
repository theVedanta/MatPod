const express = require("express");
const router = express.Router();
var pods = require("./usrPods");
const methodOverride = require("method-override");

var firstQues = true;
var qao = {};
let quiz = {};
let addGenre = "";
let quesDone = 1;

router.use(methodOverride("_method"));

// GET --
router.get("/", (req, res) => {
    let quizzes = [];
    if (pods[req.user.id]) {
        quizzes = pods[req.user.id];
    };
    firstQues = true;
    res.render("pods", {
        quizzes: quizzes,
        nick: req.user.nick
    });
});

// ADD --
router.get("/add", (req, res) => {
    res.render("add", {
        firstQues: firstQues,
        quesDone: quesDone
    });
});

router.post("/add", (req, res) => {

    const body = req.body;
    let user = req.user.id;
    let ques = body.question;
    let opts = body.option;
    let sub = body.sub;
    if (firstQues) {
        addGenre = body.genre;
    };
    qao[`${ques}`] = opts;

    if (sub == "done"){
        quiz[addGenre] = qao;
        if (pods[user]) {
            pods[user].push(quiz);
        } else {
            pods[user] = [];
            pods[user].push(quiz);
        }
        qao = {};
        quiz = {};
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
    let user = req.user.id;
    let quiz;
    for (let q of pods[user]) {
        if (Object.keys(q) == genre) {
            quiz = q[genre];
        };
    };
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
    let user = req.user.id;
    for (let i = 0; i < (keys.length); i++) {
        if (i % 2 === 0) {
            qao[vals[i]] = vals[i + 1];
        };
    };
    let genre = req.params.genre;
    for (let q of pods[user]) {
        if (Object.keys(q)[0] == genre) {
            q[genre] = qao;
        };
    };
    qao = {};
    quiz = {};

    res.redirect("/pods");
});

// DELETE
router.delete("/delete/:genre", (req, res) => {
    let genre = req.params.genre;
    for (let quiz of pods[req.user.id]) {
        if (Object.keys(quiz) == genre) {
            pods[req.user.id].splice(pods[req.user.id].indexOf(quiz), 1);
        };
    }
    res.redirect("/pods");
});

module.exports = router;
