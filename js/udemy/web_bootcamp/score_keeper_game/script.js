//document.querySelector("body").style.background="black";
// console.log(document.querySelector("#play-to").value);

let score1 = 0;
let score2 = 0;

let playing = true;

const score1dom = document.querySelector("#score-1");
const score2dom = document.querySelector("#score-2");

document.querySelector("#btn-score-1").addEventListener("click", () => {
    score1 += 1;
    updateScore();
});

document.querySelector("#btn-score-2").addEventListener("click", () => {
    score2 += 1;
    updateScore();
});

document.querySelector("#btn-reset").addEventListener("click", () => {
    score1 = 0;
    score2 = 0;
    playing = true;
    score1dom.classList.remove("winner");
    score1dom.textContent = 0;
    score2dom.classList.remove("winner");
    score2dom.textContent = 0;
    document.querySelector("#play-to").value =0;
});

function updateScore() {
    let playingTo = parseInt(document.querySelector("#play-to").value);

    if (playing) {
        score1dom.textContent = score1;
        score2dom.textContent = score2;

        if (score1 === playingTo) {
            score1dom.classList.toggle("winner");
            playing = false;
        } else if (score2 === playingTo) {
            score2dom.classList.toggle("winner");
            playing = false;
        }
    }
}