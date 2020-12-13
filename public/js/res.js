
let score = parseInt(document.querySelector("#score").textContent);
let total = parseInt(document.querySelector("#total").textContent);

let percentage = score/total*100;
let rem = document.querySelector("#rem");

if (percentage >= 95) {
    rem.textContent = ("Excellent!");
} else if (percentage >= 75) {
    rem.textContent = ("Well Done!");
} else if (percentage >= 50) {
    rem.textContent = ("Average");
} else if(percentage >= 35) {
    rem.textContent = ("Need Practice!");
} else {
    rem.textContent = ("Need Lots of Improvement!");
};
document.querySelector("#perc").textContent = percentage + "%"