(function() {
    
    var score = 0;
    
    function displayScore() {
        console.log("Current score: " + score);
    }

    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.logQuestion = function() {
            console.log(this.question);
            for (var i = 0; i < this.answers.length; i++) {
                console.log(i + ". " + this.answers[i]);
            }
        }
        this.checkAnswer = function(a) {
            if (a == this.correctAnswer) {
                console.log("Correct answer!");
                score += 1;
            } else {
                console.log("Wrong answer!");
            }
        }
    }

    var question1 = new Question("What is white and flies?", ["Swan", "Crow", "Painter"], 0);
    var question2 = new Question("How many season are there in Finland?", [1, 2, 3, 4], 3);
    var question3 = new Question("What is the unit of the strength of radio waves?", ["W", "dB", "Ohm"], 1);
    
    var questions = [question1, question2, question3];
    
    function nextQuestion() {
        var qi = Math.floor(Math.random() * questions.length);
        var chosenQuestion = questions[qi];

        chosenQuestion.logQuestion();
        
        var answer = prompt("What is the correct answer? (write \"exit\" to quit the game)");

        if (answer !== "exit") {
            
            chosenQuestion.checkAnswer(answer);
            displayScore();
            
            return true;
        } else {
            return false;
        }
    }

    while (true) {
        if (!nextQuestion()) {
            console.log("Game ended. Final score: " + score);
            break;
        }
    }
    
    
})();



