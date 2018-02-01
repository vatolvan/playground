/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (!gamePlaying) {
        return;
    }
    
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    
    if (dice === lastDice && lastDice === 6 || (dice === 6 && dice2 === 6)) {
        scores[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent = 0;
        nextPlayer();
        return;
    }
    lastDice = dice2;
    
    // Display the result
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png"
    
    var diceDom2 = document.querySelector(".dice2");
    diceDom2.style.display = "block";
    diceDom2.src = "dice-" + dice2 + ".png"
         
    if (dice !== 1 && dice2 !== 1) {
        roundScore += dice + dice2
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
        nextPlayer(); 
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (!gamePlaying) {
        return;
    }
    
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    
    var maxScore = document.getElementById("score-field").value;
    console.log(maxScore ? maxScore : 20);
    
    if (scores[activePlayer] >= (maxScore ? maxScore : 20)) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");        
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active"); 
        gamePlaying = false;
    } else {
        nextPlayer();
    }

});

function nextPlayer() {
    roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    activePlayer = activePlayer ? 0 : 1;
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    gamePlaying = true;
    
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    
    document.querySelector("#score-0").textContent = 0;
    document.querySelector("#score-1").textContent = 0;

    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    
    document.querySelector(".player-0-panel").classList.remove("winner");        
    document.querySelector(".player-1-panel").classList.remove("winner");
    
    document.querySelector(".player-0-panel").classList.remove("active");  
    document.querySelector(".player-0-panel").classList.add("active"); 
    
    document.querySelector(".player-1-panel").classList.remove("active");  

}
