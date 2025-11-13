const score = document.querySelector("#score");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const btn = document.querySelector("#btn");

let count = 0;
let num1 = Math.floor(Math.random() * 20);
let num2 = Math.floor(Math.random() * 20);

const displayQuestion = ()=>{
    question.innerHTML = `What is ${num1} X ${num2}?`;
}
displayQuestion();
btn.addEventListener("click", () => {
  let inputAnswer = Number(answer.value.trim());
  if (answer.value === "") {
    alert("Enter your number");
  }  if (inputAnswer === num1 * num2) {
    count++;
    score.innerText = `Score ${count}`;
  } 
    num1 = Math.floor(Math.random() * 20);
    num2 = Math.floor(Math.random() * 20);
    displayQuestion();
    answer.value = "";
});