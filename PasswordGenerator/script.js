const lengthPassword = document.getElementById("lengthNumber");
const upperCase = document.getElementById("uppercase");
const lowerCase = document.getElementById("lowercase");
const number = document.getElementById("number");
const symobol = document.getElementById("symbols");
const passwordInput = document.getElementById("passwordInput");
const copy = document.getElementById("copy")
const generate = document.getElementById("generate");

const upperCaseString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseString = 'abcdefghijklmnopqrstuvwxyz';
const numberString = '0123456789';
const symbolString = '!@#$%^&*()_+';

let password = '';
generate.addEventListener('click',()=>{
    let str ='';
    password ='';
    if(upperCase.checked){
        str += upperCaseString;
    }
    if(lowerCase.checked){
        str += lowerCaseString
    }
    if(number.checked){
        str += numberString
    }
    if(symobol.checked){
        str += symbolString;
    }
    for(let i =0;i<lengthPassword.value;i++){
        let index =Math.floor(Math.random()*str.length);
        password += str[index];
    }
    passwordInput.value = password;
})
copy.addEventListener('click',()=>{
    if(passwordInput.value === ""){
        alert("Please Generate a Password First");
    }
    else{
        const newElement = document.createElement('textarea');
        newElement.value = passwordInput.value;
        document.body.appendChild(newElement);
        newElement.select();
        document.execCommand('copy');
        alert("Password copied to clipboard");
        newElement.remove();
    }
})