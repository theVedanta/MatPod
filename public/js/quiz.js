let prog = document.querySelector(".prog");

let progress = 0;

function move() {
    progress += 0.5;
    prog.style.width = `${progress}%`;
    if (progress == 100) {
        clearInterval(foo);
        document.querySelector(".opts").style.display = "none";
        document.querySelector(".timeUp").style.display = "flex";
    };
}

let foo = setInterval(move, 100);
