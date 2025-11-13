const WeightInKG = document.getElementById("WeightInKG");
const weightinPound = document.querySelector(".weightinPound");

WeightInKG.addEventListener('keyup',()=>{
       let poundWeight = (WeightInKG.value)*2.20462;
       weightinPound.innerText = poundWeight.toFixed(2);
})