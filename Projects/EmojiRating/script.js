const starsElement = document.querySelectorAll('.fa-star');
const emojisElement = document.querySelectorAll('.fa-regular')
const colorsArray = ['red','orange','lightblue','lightgreen','green']
updateRating(0)
starsElement.forEach((starElement,index) =>{
    starElement.addEventListener('click', ()=>{
        updateRating(index)
        })
})
function updateRating(index){
    starsElement.forEach((starElement,idx)=>{
        if(idx<index+1){
            starElement.classList.add('active');
            
        }
        else{
            starElement.classList.remove('active');
        }
    })
    emojisElement.forEach((emojiElement)=>{
        emojiElement.style.transform = `translateX(-${index * 50}px)`;
        emojiElement.style.color = colorsArray[index]
    })
}