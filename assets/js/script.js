
// array of questions to pull from
const questions = [
  {
    question: "Which built-in JavaScript method returns the calling string value converted to upper case?",
    answers: ["toUpperCase()", "toUpper()", "changeCase(upper)", "uppercase.text()"],
    correct: 0
  },

  {
    question: "What does HTML stand for?",
    answers: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Text Markup Leveler"],
    correct: 2
  },

  {
    question: "What does JavaScript return to you if you try to access an object's property that doesn't exist?",
    answers: ["null", "undefined", "oopsies", "0"],
    correct: 1
  },

  {
    question: "Which term is used to describe expressions that result in the value of either true or false?",
    answers: ["Selection", "Condition", "Concatenation", "Boolean"],
    correct: 3
  }
];
// variables to target the DOM
const mainEl = document.getElementById('main')
const startButton = document.querySelector("#start")
const questionsEl = document.querySelector("#question-title")
const timerEl = document.querySelector("#timer")
const timeEl = document.querySelector("#time");
const optionsEl = document.querySelector("#options");
const submitBtn = document.getElementById("submit-button");
const initialsEl = document.getElementsByClassName("initials");
const startingArea = document.getElementById('begin-quiz')
const resultsEl = document.getElementById('result')
const quizEnd = document.getElementById('end-quiz')
const testSection = document.getElementById('questions')
const finalScore = document.getElementById('final-score')
const enterScoreEl = document.getElementsByClassName('initials')
let secondsLeft = questions.length * 10
let correctAnswers = 0

// sets the timer up and makes it tick down every second
function setTime() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left";

        if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        sendMessage();
        optionsEl.remove()
        endQuiz()
        }

    }, 1000);
}

function sendMessage() {
    timerEl.textContent = "Time's Up!";
}

let shuffledQuestions, currentQuestionIndex

//on click it starts the quiz
startButton.addEventListener('click', startQuiz)


//function to start the test
function startQuiz() {
  console.log('started')
  startingArea.classList.add('hide')
  mainEl.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setTime()
  setNextQuestion()
}


function setNextQuestion(){
  resetState()
  if (currentQuestionIndex < shuffledQuestions.length) showQuestion(shuffledQuestions[currentQuestionIndex])
  else endQuiz()
}

// shows the question 
function showQuestion(question){
  questionsEl.innerHTML = question.question
  question.answers.forEach(answer => {
    let options = document.createElement('button')
    options.innerText = answer
    options.addEventListener('click', () => selectAnswer(options, answer, question.correct))
    optionsEl.appendChild(options)
  });
}

//resets state after clicking on the answer
function resetState(){
  while (optionsEl.firstChild) {
    optionsEl.removeChild
    (optionsEl.firstChild)
  }
}
//when we select an answer it goes to the next question and sets it 
function selectAnswer(options, answer, correct) {
  result(correct, shuffledQuestions[currentQuestionIndex].answers.indexOf(answer))
  currentQuestionIndex++
  setNextQuestion()
}

//give you correct or wrong if you chose correctly and increments your score by 1 every time you get it correct
// the else section tells you if you are wrong it also decreases the time by 5 seconds every wrong answer
function result(correct, answer) {
  if (correct === answer) {
    resultsEl.classList.remove('results-hide')
    resultsEl.textContent = 'correct'
    correctAnswers++ 
    finalScore.textContent = correctAnswers.toString()
  } else {
    resultsEl.classList.remove('results-hide')
    resultsEl.textContent = 'wrong'
    secondsLeft = secondsLeft - 5
  }
}

//ends quiz
function endQuiz() {
  console.log("QUIZ ENDED")
  timerEl.classList.add('hide')
  questionsEl.classList.add('hide')
  quizEnd.classList.remove('hide')
  resultsEl.classList.add('hide')
}

