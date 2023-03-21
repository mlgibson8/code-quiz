const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var timerEl = document.getElementById('countDown');
var mainEl = document.getElementById('main');
let currentQuestion = {}
let acceptingAnswers = true
let interval = 0
let score = 0
let questionCounter = 0
let availableQuestions = []

function countDown(){
   var timeLeft = 40;
    var timeLeft = setInterval(function() 
    {
         if (timeLeft > 1) {
         timeLeft--;
          } 
 }, 1000);
}


let questions = [
    {
        question: "What is 2 + 2?",
        choice1: "4",
        choice2: "22", 
        choice3: "11",
        choice4: "Two2", 
         answer: 1,
          },
       {  
         question: "Which property is used to change the background color?",
        choice1: "backgroundColor",
        choice2: "BgColor",
        choice3: "Color-Background",
        choice4: "background",
        answer: 4
        },
      {
        question: "How to write an IF statement in JavaScript?",
        choice1: "if i==5",
        choice2: "if(i==5){",
        choice3: "if(i==5)then",
        choice4: "if i==5 then",
        answer: 2
        
      },
      {
        question: 'Is web development stressful to learn?',
        choice1: 'Kinda',
        choice2: 'Yes',
        choice3: 'Um no',
        choice4: 'Im not really paying attention', 
        answer: 2 
      },
    
      {
        question: 'What is 4 * 2?',    
        choice1: `6`,
        choice2: `8`,
        choice3: `55`,
        choice4: `95`, 
        answer: 2
        }
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    time = 40
    }


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } 
        

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
            })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


startGame()