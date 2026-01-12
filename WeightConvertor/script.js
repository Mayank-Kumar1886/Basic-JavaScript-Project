<<<<<<< HEAD
const WeightInKG = document.getElementById("WeightInKG");
const weightinPound = document.querySelector(".weightinPound");

WeightInKG.addEventListener('keyup',()=>{
       let poundWeight = (WeightInKG.value)*2.20462;
       weightinPound.innerText = poundWeight.toFixed(2);
=======
const WeightInKG = document.getElementById("WeightInKG");
const weightinPound = document.querySelector(".weightinPound");

WeightInKG.addEventListener('keyup',()=>{
       let poundWeight = (WeightInKG.value)*2.20462;
       weightinPound.innerText = poundWeight.toFixed(2);
>>>>>>> 88423350aac196a0369d0a1597bda7b79843098a
})