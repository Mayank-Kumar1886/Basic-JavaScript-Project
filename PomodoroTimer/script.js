const start = document.getElementById("start");
const reset = document.getElementById("reset");
const stop = document.getElementById("stop");
const timer = document.querySelector(".timer");

let minutes = 25;
let seconds = 0;
let timerID;

start.addEventListener('click', () => {
    timerID=setInterval(() => {

        if( seconds === 0 ) {
            seconds = 59;
            if( minutes !== 0 ){
                minutes--;
            }

        }else{
            seconds--;
        }
        timer.innerHTML = `${minutes}:${seconds}`;
    }, 1000);
});

stop.addEventListener('click',()=>{
    clearInterval(timerID);
})

reset.addEventListener('click',()=>{
    minutes = 25;
    seconds =0;
    timer.innerHTML = `${minutes}:0${seconds}`;
})