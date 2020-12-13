let dels = document.querySelectorAll(".del");
for (let del of dels) {
    del.addEventListener("click", () => {
        del.nextElementSibling.style.display = "inline-block";
    });
};

let nos = document.querySelectorAll(".no");
for (let no of nos) {
    no.addEventListener("click", () => {
        no.parentElement.parentElement.style.display = "none";
    });
};
