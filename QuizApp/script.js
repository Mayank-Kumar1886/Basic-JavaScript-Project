const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");

const quiz = [
  {
    question: "Which of the following is a primitive data type in JavaScript?",
    choices: ["Object", "Function", "String", "Array"],
    answer: "String",
  },
  {
    question: "What is the output of: typeof null?",
    choices: ["'object'", "'null'", "'undefined'", "'number'"],
    answer: "'object'",
  },
  {
    question: "Which method adds an element to the end of an array?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },
    {
      question: "Which symbol is used for strict equality comparison?",
      choices: ["=", "==", "===", "!="],
      answer: "===",
    },
    {
      question: "What will this return: Array.isArray([])?",
      choices: ["true", "false", "undefined", "null"],
      answer: "true",
    },
    {
      question: "How do you define a function in JavaScript?",
      choices: [
        "function myFunc() {}",
        "def myFunc() {}",
        "function:myFunc() {}",
        "func myFunc() {}",
      ],
      answer: "function myFunc() {}",
    },
    {
      question: "Which array method returns the first matching element?",
      choices: ["filter()", "find()", "map()", "reduce()"],
      answer: "find()",
    },
    {
      question: "What does NaN stand for in JavaScript?",
      choices: [
        "Not a Name",
        "Name as Number",
        "Not a Number",
        "Negative and Null",
      ],
      answer: "Not a Number",
    },
    {
      question: "Which keyword is used to declare a constant variable?",
      choices: ["let", "const", "var", "define"],
      answer: "const",
    },
    {
      question: "What does JSON.stringify() do?",
      choices: [
        "Parses JSON into an object",
        "Converts a string to JSON",
        "Converts an object to a JSON string",
        "Saves JSON to a file",
      ],
      answer: "Converts an object to a JSON string",
    },
    {
      question:
        "Which of the following is used to declare a variable that can be reassigned?",
      choices: ["const", "let", "static", "define"],
      answer: "let",
    },
    {
      question: "What does the `===` operator do?",
      choices: [
        "Compares value only",
        "Compares reference only",
        "Compares value and type",
        "Assigns a value",
      ],
      answer: "Compares value and type",
    },
    {
      question: "How do you write a comment in JavaScript?",
      choices: ["<!-- comment -->", "// comment", "# comment", "** comment **"],
      answer: "// comment",
    },
    {
      question: "Which method removes the last element from an array?",
      choices: ["shift()", "pop()", "remove()", "splice()"],
      answer: "pop()",
    },
    {
      question: "Which method combines two or more arrays?",
      choices: ["concat()", "combine()", "merge()", "join()"],
      answer: "concat()",
    },
    {
      question: "How can you convert a string to an integer in JavaScript?",
      choices: ["parseInt()", "Number.parse()", "stringToInt()", "parse()"],
      answer: "parseInt()",
    },
    {
      question: "What is the default value of `undefined + 1`?",
      choices: ["1", "NaN", "undefined1", "Error"],
      answer: "NaN",
    },
    {
      question:
        "Which loop will execute at least once, even if the condition is false?",
      choices: ["for loop", "while loop", "do...while loop", "foreach loop"],
      answer: "do...while loop",
    },
    {
      question: "What keyword is used to exit a loop prematurely?",
      choices: ["exit", "stop", "break", "return"],
      answer: "break",
    },
    {
      question: "Which object is the root of everything in JavaScript?",
      choices: ["window", "document", "global", "Object"],
      answer: "Object",
    },
    {
      question: "What will `typeof NaN` return?",
      choices: ["NaN", "undefined", "number", "object"],
      answer: "number",
    },
    {
      question:
        "Which method can be used to loop over all properties in an object?",
      choices: ["map()", "for...in", "forEach()", "loop()"],
      answer: "for...in",
    },
    {
      question: "Which keyword is used to define a class in JavaScript?",
      choices: ["class", "Class", "function", "defineClass"],
      answer: "class",
    },
    {
      question: "What is the result of `'5' + 2` in JavaScript?",
      choices: ["7", "52", "Error", "undefined"],
      answer: "52",
    },
    {
      question:
        "Which method returns a new array with all elements that pass the test?",
      choices: ["map()", "filter()", "reduce()", "find()"],
      answer: "filter()",
    },
    {
      question: "Which operator is used to spread the elements of an array?",
      choices: ["...", "+++", "array()", "expand()"],
      answer: "...",
    },
    {
      question: "How do you define an arrow function?",
      choices: ["function() => {}", "() -> {}", "() => {}", "=> function()"],
      answer: "() => {}",
    },
    {
      question: "What does `JSON.parse()` do?",
      choices: [
        "Converts a string to JSON",
        "Parses a JSON string into an object",
        "Saves JSON",
        "Validates JSON syntax",
      ],
      answer: "Parses a JSON string into an object",
    },
    {
      question: "What does the `this` keyword refer to in a regular function?",
      choices: [
        "Current object",
        "Global object (or window)",
        "Class name",
        "Parent object",
      ],
      answer: "Global object (or window)",
    },
    {
      question: "Which keyword is used to create an asynchronous function?",
      choices: ["await", "then", "async", "promise"],
      answer: "async",
    },
];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;
const showQuestion = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question;

  choicesBox.textContent = "";
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.classList.add("choice");
    choiceDiv.textContent = currentChoice;
    choicesBox.appendChild(choiceDiv);

    choiceDiv.addEventListener("click", () => {
  // Remove 'selected' class from all choices first
  const allChoices = document.querySelectorAll(".choice");
  allChoices.forEach(choice => choice.classList.remove("selected"));

  // Then add 'selected' to the clicked one
  choiceDiv.classList.add("selected");
});

  }
  if (currentQuestionIndex < quiz.length) {
    startTimer();
  }
};
const checkAnswer = () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    displayAlertSuccess("Correct Answer!");
    score++;
  } else {
    displayAlertError(
      `Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`
    );
  }
  timeLeft = 15;
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestion();
  } else {
    showScore();
    stopTimer();
  }
};
const showScore = () => {
  questionBox.textContent = "";
  choicesBox.textContent = "";
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}`;
  displayAlertSuccess("You have Completed your quiz");
  nextBtn.textContent = "Play Again";
  quizOver =true;
  timer.style.display = "none";
};


const displayAlertSuccess = (msg) => {
  alert.style.display = "flex";
  alert.style.backgroundColor = "green";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};
const displayAlertError = (msg) => {
  alert.style.backgroundColor = "red";
  alert.style.display = "flex";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const startTimer = () => {
  clearInterval(timerID); // ✅ Clear any existing timer
  timeLeft = 15;
  timer.textContent = timeLeft;

  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerID); // ✅ Stop timer when time is up
      const confirmUser = confirm("Time Up!!! Do you want to play quiz again");
      if (confirmUser) {
        startQuiz();
      } else {
        startBtn.style.display = "block";
        container.style.display = "none";
      }
    }
  };
  timerID = setInterval(countDown, 1000);
};

const stopTimer = () => {
  clearInterval(timerID);
};

const shuffleQuestion = ()=>{
    for(let i= quiz.length-1; i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i],quiz[j]]= [quiz[j],quiz[i]]
    }
    currentQuestionIndex =0;
    showQuestion();
}

const startQuiz = () => {
  timeLeft = 15;
  timer.style.display = "flex";
  shuffleQuestion()

};

nextBtn.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (!selectedChoice && nextBtn.textContent === "Next") {
    displayAlertSuccess("Select your answer");
    return;
  }
  if (quizOver === true) {
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    startQuiz();
    quizOver = false;
    score = 0;
  } else {
    checkAnswer();
  }
});

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  showQuestion();
});

document.addEventListener("DOMContentLoaded", showQuestion);
