<<<<<<< HEAD
const textarea = document.getElementById("textarea");
const button = document.getElementById("btn");
const totalVowel = document.getElementById("totalVowel");


button.addEventListener("click",()=>{
    let total = 0;
    let input = textarea.value.toLowerCase();
    for(let i = 0;i<input.length;i++){
        let char = input[i];
        if(char ==="a" || char === "e"|| char === "i" || char === "o" || char === "u"){
            total++;
        }
    }
    totalVowel.innerHTML = `The total number of vowel is ${total}`;
=======
const textarea = document.getElementById("textarea");
const button = document.getElementById("btn");
const totalVowel = document.getElementById("totalVowel");


button.addEventListener("click",()=>{
    let total = 0;
    let input = textarea.value.toLowerCase();
    for(let i = 0;i<input.length;i++){
        let char = input[i];
        if(char ==="a" || char === "e"|| char === "i" || char === "o" || char === "u"){
            total++;
        }
    }
    totalVowel.innerHTML = `The total number of vowel is ${total}`;
>>>>>>> 88423350aac196a0369d0a1597bda7b79843098a
})