const xPosition = document.querySelector(".coodinatesX")
const yPosition = document.querySelector(".coodinatesY")

window.addEventListener("mouseover",(event)=>{
    const xClient = event.clientX;
    const yClient = event.clientY;
    xPosition.textContent = xClient;
    yPosition.textContent = yClient;
})