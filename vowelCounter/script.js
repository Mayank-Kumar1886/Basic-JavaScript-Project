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
})