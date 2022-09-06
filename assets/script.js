// define variables from html 
const quizquestions = document.getElementById("quiz");
const results = document.getElementById("result");
const scorefinal = document.getElementById("finalScore");
const begining = document.getElementById("begining");
const gameover = document.getElementById("gameover");
const scorebutton = document.getElementById("submitScore");
const highscores = document.getElementById("highscore-score");
const questions = document.getElementById("questions");
const timer = document.getElementById("timer");
const startbutton = document.getElementById("startbutton");
const endgame = document.getElementById("endGameButtons");
const hscontainer = document.getElementById("highscoreContainer");
const hspage = document.getElementById("high-scorePage");
const initials = document.getElementById("initials");
const displayinitials = document.getElementById("highscore-initials");


const buttonA = document.getElementById("a");
const buttonB = document.getElementById("b");
const buttonC = document.getElementById("c");
const buttonD = document.getElementById("d");

// Question, answers & correct answers
const quizQuestions = [

    {
        question: "&lt;h1&gt;Text&lt;/h1&gt; is the correct way of making a header in HTML.",
        choiceA: "True",
        choiceB: "False &lt;p&gt;",
        choiceC: "False &lt;div&gt;",
        choiceD: "None of the above",
        correctAnswer: "a"
    },
    {
        question: "What is used for front end of a web page?",
        choiceA: "Python",
        choiceB: "HTML, CSS",
        choiceC: "Doordash",
        choiceD: "Bootstrap",
        correctAnswer: "b"
    },
    {
        question: "What HTML tags are JavaScript code wrapped in?",
        choiceA: "&lt;div&gt;",
        choiceB: "&lt;link&gt;",
        choiceC: "&lt;head&gt;",
        choiceD: "&lt;script&gt;",
        correctAnswer: "d"
    },
    {
        question: "Where do you maintain your repositories in the course?",
        choiceA: "my pc",
        choiceB: "git lab",
        choiceC: "my usb",
        choiceD: "Github, my pc & gitlab",
        correctAnswer: "d"
    },
    {
        question: "What is the best search engine on the internet?",
        choiceA: "Google",
        choiceB: "Facebook",
        choiceC: "Tiktok",
        choiceD: "Ford",
        correctAnswer: "a"
    },
    {
        question: "How do you upload your files to git hub on the terminal?",
        choiceA: "email git hub",
        choiceB: "send whatsapp to git hub",
        choiceC: "git init - git add - git commit",
        choiceD: "call git hub",
        correctAnswer: "c"
    },
    {
        question: "What does HTML stand for?",
        choiceA: "Hyper Trainer Marking Language",
        choiceB: "Hyper Text Marketing Language",
        choiceC: "Hyper Text Markup Language",
        choiceD: "Hyper Text Markup Leveler",
        correctAnswer: "c"
    },

];
// time and score constiables, question length
var finalQuestionIndex = quizQuestions.length;
var score = 0;
var correct;
var currentQuestionIndex = 0;
var timeLeft = 50;
var timerInterval;

// display score and correct answers
function showScore() {
    quizquestions.style.display = "none"
    gameover.style.display = "flex";
    clearInterval(timerInterval);
    initials.value = "";
    scorefinal.innerHTML = "You made " + score + " out of " + quizQuestions.length + " right!";
}

// function to create the questions & answers
function generateQuizQuestion() {
    gameover.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// function that hides the start button, starts the timer and shows7 first question
function startQuiz() {
    gameover.style.display = "none";
    begining.style.display = "none";
    generateQuizQuestion();

    //Timer function 
    timerInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizquestions.style.display = "block";
}


// submit score and user save nameevent listener on click. 
scorebutton.addEventListener("click", function highscore() {


    if (initials.value === "") {
        alert("please write name");
        return false;
    } else {
        const savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        const currentUser = initials.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameover.style.display = "none";
        hscontainer.style.display = "flex";
        hspage.style.display = "block";
        endgame.style.display = "flex";


        //Local storage save highscores
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// Clear the highscore function, create new one from file storage
function generateHighscores() {
    displayinitials.innerHTML = "";
    highscores.innerHTML = "";
    const highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        const newNameSpan = document.createElement("li");
        const newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        displayinitials.appendChild(newNameSpan);
        highscores.appendChild(newScoreSpan);
    }
}

// display highscore function, hide start quiz and game over
function showHighscore() {
    begining.style.display = "none"
    gameover.style.display = "none";
    hscontainer.style.display = "flex";
    hspage.style.display = "block";
    endgame.style.display = "flex";

    generateHighscores();
}

// clear highscore local storage function
function clearScore() {
    window.localStorage.clear();
    displayinitials.textContent = "";
    highscores.textContent = "";
}

// reset quiz function
function replayQuiz() {
    timeLeft = 50;
    score = 0;
    currentQuestionIndex = 0;
    hscontainer.style.display = "none";
    gameover.style.display = "none";
    begining.style.display = "flex";

}

//alert window of correct answer
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Yes, you are correct!!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //alert window of incorrect answer
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("WROOOOOONG!!")
        currentQuestionIndex++;
        generateQuizQuestion();

    } else {
        showScore();
    }
}

startbutton.addEventListener("click", startQuiz);