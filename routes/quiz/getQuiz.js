const qao = require("../bank/bank");

function getQuiz(genre) {
    let quizGenre = genre;

    // if (genre == "random") {
    //     quizGenre = genresAvailable[Math.floor(Math.random() * genresAvailable.length)];
    // } else {
    //     quizGenre = genre;
    // }

    const quiz = qao[quizGenre];
    return quiz;
};

module.exports = getQuiz;
