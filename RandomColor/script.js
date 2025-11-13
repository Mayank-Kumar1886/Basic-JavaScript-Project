const container = document.querySelector(".container")


const getRandom = ()=>{
    return Math.floor(Math.random()*16);
}

const hexCode = "0123456789ABCDEF";
for(let i =0;i<10000;i++){
    const box = document.createElement("div");
    box.classList.add("colorCard");
    let color = "#";
    for(let j=0;j<6;j++){
        color += hexCode[getRandom()];
    }
    console.log(color)
    box.textContent = color;
    box.style.backgroundColor = color;
    container.appendChild(box);
}

