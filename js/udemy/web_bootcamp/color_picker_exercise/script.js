document.querySelector("#easy-mode").addEventListener("click", function() {
    this.classList.add("selected");
    document.querySelector("#hard-mode").classList.remove("selected");
    easyMode = true;
    init();
});

document.querySelector("#hard-mode").addEventListener("click", function() {
    this.classList.add("selected");
    document.querySelector("#easy-mode").classList.remove("selected");
    easyMode = false;
    init();
});

document.querySelector("#new-game").addEventListener("click", function() {
    init();
});

let cubes = document.querySelectorAll(".square");
let maxCubes;
let easyMode = true;

function init() {
    document.querySelector("#succesful-pick").textContent = "";
    for (let i = 0; i < cubes.length; i++) {
        cubes[i].style.background = "#232323";
    }

    let colors = [];
    maxCubes = easyMode ? 3 : 6;

    // Select one randomly
    let correctIndex = Math.floor(Math.random() * maxCubes);

    let gameEnded = false;

    for (let i = 0; i < maxCubes; i++) {
        console.log(i);
        cubes[i].style.background = randomColor();
        cubes[i].addEventListener("click", function() {
            if (!gameEnded) {
                if (this.style.background === cubes[correctIndex].style.background) {
                    win(this.style.background);
                    gameEnded = true;
                    document.querySelector("#succesful-pick").textContent = "You won!"
                } else {
                    document.querySelector("#succesful-pick").textContent = "Try again!"
                    this.style.background = "#232323";
                }
            }
        })
    }

    document.querySelector("#color-to-guess").textContent = cubes[correctIndex].style.background;
    document.querySelector("#rgb-panel").style.background = randomColor();

}

function win(color) {
    //const color = `rgb(${colors[correctIndex][0]},${colors[correctIndex][1]},${colors[correctIndex][2]})`;
    for (let i = 0; i < maxCubes; i++) {
        cubes[i].style.background = color;
        cubes[i].removeEventListener("click");
    }

    document.querySelector("#rgb-panel").style.background = color;


}

const randomColor = () => {
    color = [Math.random(), Math.random(), Math.random()].map(e => Math.floor(e * 256));
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

init();