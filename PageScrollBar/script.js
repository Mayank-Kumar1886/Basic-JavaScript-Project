<<<<<<< HEAD
const scrollBar = document.querySelector(".scrollBar");

window.addEventListener("scroll",()=>{
    let percentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    scrollBar.style.width = percentage + '%'
=======
const scrollBar = document.querySelector(".scrollBar");

window.addEventListener("scroll",()=>{
    let percentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    scrollBar.style.width = percentage + '%'
>>>>>>> 88423350aac196a0369d0a1597bda7b79843098a
})