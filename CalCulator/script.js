const output = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let str ="";

buttons.forEach((button)=>{
    button.addEventListener('click',(event)=>{
      if(event.target.textContent.trim()=== "AC"){
         str = "";
         output.value = "";
      }else if(event.target.textContent.trim()=== "="){
        str = eval(str);
        output.value = str;
      }else if(event.target.textContent.trim()=== "DEL"){
         str = str.substring(0,str.length -1);
         output.value = str;
      }else{
         str += event.target.textContent.trim();
         output.value = str;
      }

    })
})