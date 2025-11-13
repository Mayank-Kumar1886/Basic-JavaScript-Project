const quiz = [
    
  {
    "question": "What will the following code output? console.log(typeof null);",
    "options": ["\"null\"", "\"object\"", "\"undefined\"", "\"boolean\""],
    "answer": "\"object\""
  },
  {
    "question": "Which keyword is used to declare a variable that cannot be reassigned?",
    "options": ["let", "const", "var", "static"],
    "answer": "const"
  },
  {
    "question": "What is the result of 2 + '2' in JavaScript?",
    "options": ["4", "22", "NaN", "undefined"],
    "answer": "22"
  },
  {
    "question": "What does the === operator do in JavaScript?",
    "options": ["Compares only values", "Compares values and types", "Assigns a value", "Checks type only"],
    "answer": "Compares values and types"
  },
  {
    "question": "What is the output of: console.log(0 == '0')?",
    "options": ["true", "false", "NaN", "undefined"],
    "answer": "true"
  },
  {
    "question": "Which of the following is NOT a JavaScript data type?",
    "options": ["String", "Boolean", "Float", "Undefined"],
    "answer": "Float"
  },
  {
    "question": "How do you write a comment in JavaScript?",
    "options": ["<!-- comment -->", "// comment", "# comment", "** comment **"],
    "answer": "// comment"
  },
  {
    "question": "Which method converts JSON to a JavaScript object?",
    "options": ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS()"],
    "answer": "JSON.parse()"
  },
  {
    "question": "Which function is used to delay execution in JavaScript?",
    "options": ["setTimeout()", "delay()", "wait()", "pause()"],
    "answer": "setTimeout()"
  },
  {
    "question": "What is a closure in JavaScript?",
    "options": [
      "A function having access to variables from another function",
      "A variable inside a function",
      "A loop that closes automatically",
      "An API call"
    ],
    "answer": "A function having access to variables from another function"
  },
  {
    "question": "Which symbol is used for comments in JavaScript?",
    "options": ["//", "/*", "<!--", "#"],
    "answer": "//"
  },
  {
    "question": "How do you declare an arrow function?",
    "options": ["function => () {}", "() => {}", "=> function() {}", "func() => {}"],
    "answer": "() => {}"
  },
  {
    "question": "What does NaN stand for?",
    "options": ["Not a Name", "Not a Number", "Negative and Null", "Name as Null"],
    "answer": "Not a Number"
  },
  {
    "question": "How do you create an array in JavaScript?",
    "options": ["let arr = {}", "let arr = []", "let arr = ()", "let arr = <>"],
    "answer": "let arr = []"
  },
  {
    "question": "Which array method adds an element at the end?",
    "options": ["push()", "pop()", "shift()", "unshift()"],
    "answer": "push()"
  },
  {
    "question": "Which method can be used to find HTML elements in JavaScript?",
    "options": ["getElementById()", "querySelector()", "getElementsByClassName()", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "What will `typeof NaN` return?",
    "options": ["NaN", "number", "undefined", "object"],
    "answer": "number"
  },
  {
    "question": "Which keyword is used to define a class in ES6?",
    "options": ["function", "class", "def", "newClass"],
    "answer": "class"
  },
  {
    "question": "Which loop is best for iterating over object properties?",
    "options": ["for", "for...of", "for...in", "while"],
    "answer": "for...in"
  },
  {
    "question": "What does DOM stand for?",
    "options": ["Document Object Model", "Data Object Management", "Digital Output Mode", "Display Output Mechanism"],
    "answer": "Document Object Model"
  }
]

let currentQuiz = 0;
let score = 0;

const quizQuestion = document.querySelector("#quiz-question");
const optionA = document.querySelector("#text_option_a");
const optionB = document.querySelector("#text_option_b");
const optionC = document.querySelector("#text_option_c");
const optionD = document.querySelector("#text_option_d");
const submitBtn = document.querySelector("#submitBtn");
const answers = document.querySelectorAll(".answer");

const loadQuiz = ()=>{
    deselectAnswer();
    const currentData = quiz[currentQuiz];
    quizQuestion.innerText = currentData.question;
    optionA.innerText = currentData.options[0];
    optionB.innerText = currentData.options[1];
    optionC.innerText = currentData.options[2];
    optionD.innerText = currentData.options[3];
}
const deselectAnswer = ()=>{
    answers.forEach(answer => answer.checked = false);
}

const getSelected = ()=>{
    let selectedAnswer = null;
    answers.forEach((answer,index)=>{
        if(answer.checked){
            selectedAnswer = quiz[currentQuiz].options[index]
        }
    })
    return selectedAnswer
}

submitBtn.addEventListener('click',()=>{
    const selected = getSelected();
    if(selected){
        if(selected === quiz[currentQuiz].answer){
            score++;
        }
        currentQuiz++;
        if(currentQuiz < quiz.length){
            loadQuiz();
        }
        else{
            document.querySelector(".container").innerHTML = `<h2>Your Score: ${score} / ${quiz.length}</h2>
        <button id="playAgainBtn" onclick="location.reload()">Play Again</button>`
        }
    }
    else{
        alert("Please select an answer");
    }
})

loadQuiz();

