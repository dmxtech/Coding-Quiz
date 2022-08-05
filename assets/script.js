// variables from HTML IDS 
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var startQuizDiv = document.getElementById("begining");
var gameoverDiv = document.getElementById("gameover");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbutton");
var endGameBtns = document.getElementById("endGameButtons");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");


var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Question, answers & correct answers
var quizQuestions = [
    
  {
    question: "&lt;h1&gt;Text&lt;/h1&gt; is the correct way of making a header in HTML.",
    choiceA: "True",
    choiceB: "False &lt;p&gt;",
    choiceC: "False &lt;div&gt;",
    choiceD: "None of the above",
    correctAnswer: "a"},
   {
    question: "What is used for front end of a web page?",
    choiceA: "Python",
    choiceB: "HTML, CSS",
    choiceC: "Doordash",
    choiceD: "Bootstrap",
    correctAnswer: "b"},
    {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"},
    {
    question: "Where do you maintain your repositories in the course?",
    choiceA: "my pc",
    choiceB: "git lab",
    choiceC: "my usb",
    choiceD: "Github, my pc & gitlab",
    correctAnswer: "d"},  
    {
    question: "What is the best search engine on the internet?",
    choiceA: "Google",
    choiceB: "Facebook",
    choiceC: "Tiktok",
    choiceD: "Ford",
    correctAnswer: "a"},
    {
    question: "How do you upload your files to git hub on the terminal?",
    choiceA: "email git hub",
    choiceB: "send whatsapp to git hub",
    choiceC: "git init - git add - git commit",
    choiceD: "call git hub",
    correctAnswer: "c"},
    {
    question: "What does HTML stand for?",
    choiceA: "Hyper Trainer Marking Language",
    choiceB: "Hyper Text Marketing Language",
    choiceC: "Hyper Text Markup Language",
    choiceD: "Hyper Text Markup Leveler",
    correctAnswer: "c"},    
    
    ];
// time and score variables, question length
var finalQuestionIndex = quizQuestions.length;
var score = 0;
var correct;
var currentQuestionIndex = 0;
var timeLeft = 50;
var timerInterval;

// display score and correct answers
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You made " + score + " out of " + quizQuestions.length + " right!";
}

// function to create the questions & answers
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// function that hides the start button, starts the timer and shows7 first question
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer function 
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}


// submit score and user save nameevent listener on click. 
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("please write name");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        

        //Local storage save highscores
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Clear the highscore function, create new one from file storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// display highscore function, hide start quiz and game over
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// clear highscore local storage function
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// reset quiz function
function replayQuiz(){
    timeLeft = 50;
    score = 0;
    currentQuestionIndex = 0;
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    
}

 //alert window of correct answer
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Yes, Ill even kiss you!!");
        currentQuestionIndex++;
        generateQuizQuestion();
         //alert window of incorrect answer
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("WROOOOOONG!!")
        currentQuestionIndex++;
        generateQuizQuestion();
       
    }else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);