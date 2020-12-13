let next = document.querySelector(".next");
let fName = document.querySelector("input[name='fName']");
let lName = document.querySelector("input[name='fName']");
let nick = document.querySelector("input[name='nick']");


next.addEventListener("click", e => {
    if (fName.value && lName.value && nick.value) {
        let parent = next.parentElement;
        parent.style.display = "none";
        parent.nextElementSibling.style.display = "flex";
    } else {
        document.querySelector(".msg").textContent = "Please provide everything!";
        document.querySelector("h3").style.margin = "0.6vh 0";
    }
});

let btn = document.querySelector("button");
let pass = document.querySelector("input[name='password']");
let passC = document.querySelector("input[name='passcon']");
btn.addEventListener("click", e => {
    if (pass.value !== passC.value) {
        e.preventDefault();
        document.querySelector(".msg2").textContent = "Passwords did not match!";
        btn.style.margin = "0.4vh 0";
    };
});
