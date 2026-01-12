<<<<<<< HEAD
const xPosition = document.querySelector(".coodinatesX")
const yPosition = document.querySelector(".coodinatesY")

window.addEventListener("mouseover",(event)=>{
    const xClient = event.clientX;
    const yClient = event.clientY;
    xPosition.textContent = xClient;
    yPosition.textContent = yClient;
=======
const xPosition = document.querySelector(".coodinatesX")
const yPosition = document.querySelector(".coodinatesY")

window.addEventListener("mouseover",(event)=>{
    const xClient = event.clientX;
    const yClient = event.clientY;
    xPosition.textContent = xClient;
    yPosition.textContent = yClient;
>>>>>>> 88423350aac196a0369d0a1597bda7b79843098a
})