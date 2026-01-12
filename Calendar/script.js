<<<<<<< HEAD
const month = document.querySelector(".month");
const week = document.querySelector(".week");
const day = document.querySelector(".day");
const year = document.querySelector(".year");

window.addEventListener('DOMContentLoaded',()=>{
    const date = new Date();
    day.textContent = date.getDate();
    month.textContent = date.toLocaleDateString("en-US",{month : "long"});
    year.textContent = date.getFullYear();
    week.textContent = date.toLocaleDateString("en-US",{weekday:"long"});    
=======
const month = document.querySelector(".month");
const week = document.querySelector(".week");
const day = document.querySelector(".day");
const year = document.querySelector(".year");

window.addEventListener('DOMContentLoaded',()=>{
    const date = new Date();
    day.textContent = date.getDate();
    month.textContent = date.toLocaleDateString("en-US",{month : "long"});
    year.textContent = date.getFullYear();
    week.textContent = date.toLocaleDateString("en-US",{weekday:"long"});    
>>>>>>> 88423350aac196a0369d0a1597bda7b79843098a
})