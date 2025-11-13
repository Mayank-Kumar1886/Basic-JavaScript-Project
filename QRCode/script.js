const QRInput = document.querySelector("#QRInput");
const QRImage = document.querySelector("#QRImage");
const QRBtn = document.querySelector("#QRBtn");

QRBtn.addEventListener('click',()=>{
    const inputValue = QRInput.value;
    if(!inputValue){
        alert("Please enter a valid URL");
         return;
    }
    else{
      QRImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;
      
    }
})