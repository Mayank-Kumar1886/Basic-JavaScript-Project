const scrollBar = document.querySelector(".scrollBar");

window.addEventListener("scroll",()=>{
    let percentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    scrollBar.style.width = percentage + '%'
})