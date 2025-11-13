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
})