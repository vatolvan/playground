// John
var heightJohn = 180;
var ageJohn = 25;

// Friend
var heighFriend = 150;
var ageFriend = 24;

// Compute scores
var scoreJohn = heightJohn + 5*ageJohn;
var scoreFriend = heighFriend + 5*ageFriend;

if (scoreFriend < scoreJohn) {
    console.log("John wins the game!");
} else if (scoreFriend == scoreJohn) {
    console.log("It a draw!");
} else {
    console.log("Friend wins the game!");
}


// Second game with two friends

var heightFriend2 = 185;
var ageFriend2 = 25;
var scoreFriend2 = heightFriend2 + 5*ageFriend2;

if (scoreJohn > scoreFriend) {
    
    if (scoreJohn > scoreFriend2) {
        console.log("John wins the second game!");
    } else if (scoreJohn === scoreFriend2) {
        console.log("Its a tie between John and second friend!");
    } else {
        console.log("Second friend wins the second game!");
    }
    
} else {
    
    if (scoreFriend > scoreFriend2) {
        console.log("Friend wins the second game!");
    } else if (scoreFriend === scoreFriend2) {    
        console.log("Its a tie between friends!");
    } else {
        console.log("Second friend wins the second game!");
    }
    
}