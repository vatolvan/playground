let btnChanged = false;
document.querySelector("Button").addEventListener("click", () => {
    document.querySelector("body").style.background = btnChanged ? "white" : "purple";
    btnChanged = !btnChanged;
});