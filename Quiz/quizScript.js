const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const score = document.getElementById('score');
let textUpdated = document.getElementById('textUpdate');
const checkOutText = document.getElementById('checkmeout');
const image = document.getElementById('hide-img');
const hideH2 = document.getElementById('title');


const questionContainerElement = document.getElementById('question-container');
let shuffledQuestions, curretQuestionIndex;
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

const scoreboard = {
  right: 0,
  wrong: 0
}
function startGame() { // called when start button is clicked
  resetScore();
  checkOutText.classList.remove('hide')
  hideH2.classList.add('hide')
  image.classList.add('hide-image')
  startButton.classList.add('hide') //hide start button
  questionContainerElement.classList.remove('hide'); //display questions
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  // questions array .sort randomly sorts all array elemnts
  currentQuestionIndex = 0;
  // then we use 0 index since its freshly sorted
  setNextQuestion();
}
//
function setNextQuestion() {
  textUpdated.classList.add('hide')
  clearStatusClass(document.body)
  resetAnswers()
  showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function resetAnswers() {
  nextButton.classList.add('hide')
  while(answerButtonsElement.firstChild) // while elements exist
  {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerCheck(question); //update button grid to append 3 false answers and 1 correct answer

}
function answerCheck(question){
  question.answers.forEach(answer => { //loop thru each answer in questions.answers
  const button = document.createElement('button'); // create new button element
  button.innerText = answer.text; //add answer text
  button.classList.add('btn'); // add btn class
  button.classList.add('ans'); // add ans class so it hovers

  if(answer.correct) { // if answer.correct is true then add true value to button.correct
    button.dataset.correct = answer.correct;
  }
  button.addEventListener('click', selectAnswer )
  answerButtonsElement.appendChild(button);
})
}


function selectAnswer(e){  //called when an answer button is pressed
  clearStatusClass(document.body)
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct) // changes background if answer is correct/wrong
  Array.from(answerButtonsElement.children).forEach(button =>{
    setStatusClass(button, button.dataset.correct) // change background for each button if answer is correct/wrong
  })
  if(shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
  }
  else{
    startButton.innerText = "Restart"
    startButton.classList.remove('hide')

  }
  updateScore(correct);
  textUpdatd()

}
function resetScore() {
  scoreboard.right = 0;
  scoreboard.wrong = 0;
  score.innerHTML = `
  <p>Player: ${scoreboard.right}</p>
  <p>Computer: ${scoreboard.wrong}</p>
  `;
}


function updateScore(correct) {
  score.classList.remove('hide')
  if(correct){
    scoreboard.right++;
    score.innerHTML = `
    <p>Player: ${scoreboard.right}</p>
    <p>Computer: ${scoreboard.wrong}</p>
    `;
  }
  else
  {
    scoreboard.wrong++;
    score.innerHTML = `
    <p>Player: ${scoreboard.right}</p>
    <p>Computer: ${scoreboard.wrong}</p>
    `;
  }
}
function textUpdatd(){
  textUpdate.classList.remove('hide')
  if(scoreboard.right == questions.length)
    textUpdate.innerText = "WOW you got them all right! Groovy!"
  else if(scoreboard.wrong == questions.length)
    textUpdate.innerText = "WOW you got them all wrong! Gnarly!"
  else if(scoreboard.right > scoreboard.wrong)
    textUpdate.innerText = "Not bad! - You must know your stuff!"
  else if(scoreboard.wrong > scoreboard.right )
    textUpdate.innerText = "Not doing too hot! Keep trying!"
  else if(scoreboard.wrong == scoreboard.right && scoreboard.right != 0 || scoreboard.wrong != 0)
    textUpdate.innerText = "tied with right and wrong answers!"
  else
    textUpdate.innerText = "Something must of went wrong!"
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
    if(correct){
      element.classList.add('correct')
    }
    else{
      element.classList.add('wrong')
    }
  }
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [ // an array of [[question, answers][questions, answers]] answers being a class
  {
    question: "Who was the original drummer for the beatles",
    answers: [
    {text:'Pete Best', correct: true},
    {text: 'Anty Ashton', correct: false},
    {text: 'Pete Lest', correct: false},
    {text: 'Les Monves', corrct: false},
  ]
},
{
  question: "Where in England are the beatles from?",
  answers: [
  {text:'London', correct: false},
  {text: 'Liverpool', correct: true},
  {text: 'Manchester', correct: false},
  {text: 'Wales', corrct: false},
]
},
{
  question: "Which Beatle was known as the 'cute one' ",
  answers: [
  {text:'George', correct: false},
  {text: 'Paul', correct: true},
  {text: 'Ringo', correct: false},
  {text: 'John', corrct: false},
]
},
{
  question: "Which of the Beatles did fans believe died and later replaced?",
  answers: [
  {text:'Paul', correct: true},
  {text: 'Ringo', correct: false},
  {text: 'George', correct: false},
  {text: 'John', corrct: false},
]
}
]
