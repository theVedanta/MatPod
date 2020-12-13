const express = require("express");
const router = express.Router();
const getQuiz = require("./getQuiz")

const shuffle = require("./shuffle");
let quesDone = 0;
let usrAnss = [];
let score = 0;
let quizDone = false;

// QUIZ
router.get("/", checkDone, (req, res) => {
    const genreExp = require("../home/home").genre;
    const genre = genreExp;

    quiz = getQuiz(genre);
    quess = Object.keys(quiz);
    optss = Object.values(quiz);

    anss = [];
    for (let opts of optss) {
        anss.push(opts[0])
    };

    let ques = quess[quesDone];
    let newOpts = []
    let opts = optss[quesDone];
    if (opts) {
        for (let opt of opts) {
            newOpts.push(opt)
        }
    }
    let shuffledOpts = shuffle(newOpts);

    res.render("quiz", {
        ques: ques,
        opts: shuffledOpts,
        quesDone: quesDone + 1
    });
});

router.post("/", checkDone, (req, res) => {
    const genreExp = require("../home/home").genre;
    const genre = genreExp;

    quiz = getQuiz(genre);
    quess = Object.keys(quiz);
    optss = Object.values(quiz);

    anss = [];
    for (let opts of optss) {
        anss.push(opts[0])
    };

    let usrAns = req.body.usrSubmission;
    usrAnss.push(usrAns);

    quesDone++

    if (quesDone >= quess.length) {
        for (let i = 0; i < anss.length; i++) {
            if (anss[i] == usrAnss[i]) {
                score++
            }
        }
        res.redirect("/quiz/results");
        quizDone = true;
    } else {
        res.redirect("/quiz");
    };
});

// RESULTS
router.get("/results", checkNotDone, (req, res) => {
    const genreExp = require("../home/home").genre;
    const genre = genreExp;

    quiz = getQuiz(genre);
    quess = Object.keys(quiz);
    optss = Object.values(quiz);

    anss = [];
    for (let opts of optss) {
        anss.push(opts[0])
    };

    res.render("results", {
        ques: anss.length,
        score: score
    });
    quesDone = 0;
    score = 0;
    quiz = getQuiz(genre);
    quess = Object.keys(quiz);
    optss = Object.values(quiz);
    usrAnss = [];
    anss = [];
    for (let opts of optss) {
        anss.push(opts[0]);
    };
});

router.post("/results", checkNotDone, (req, res) => {
    quizDone = false;
    res.redirect("/home");
});

// MIDDLEWARE
function checkDone(req, res, next) {
    if (quizDone) {
        res.redirect("/quiz/results")
    }
    next();
}

function checkNotDone(req, res, next) {
    if (!quizDone) {
        res.redirect("/quiz");
    };
    next();
}

module.exports = router;
