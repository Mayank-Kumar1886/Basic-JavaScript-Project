<<<<<<< HEAD
const loanAmount = document.querySelector("#loanAmount")
const interestRate = document.querySelector("#interestRate")
const monthToPay = document.querySelector("#monthToPay")
const btn = document.querySelector("#calculate");
const emi = document.querySelector("#amount");

const EMICalculate = ()=>{
    if(loanAmount.value === "" || interestRate.value === ""|| monthToPay.value === ""){
        alert("Fill the inputs...");
        return;
    }
    else{
        const principle = loanAmount.value;
        const rate = interestRate.value / 1200;
        const tenure = monthToPay.value;

        const emiValue = (principle * rate * (1 + rate)**tenure) / ((1+rate)**tenure -1);
        emi.textContent = emiValue.toFixed(2);
    }
}
=======
const loanAmount = document.querySelector("#loanAmount")
const interestRate = document.querySelector("#interestRate")
const monthToPay = document.querySelector("#monthToPay")
const btn = document.querySelector("#calculate");
const emi = document.querySelector("#amount");

const EMICalculate = ()=>{
    if(loanAmount.value === "" || interestRate.value === ""|| monthToPay.value === ""){
        alert("Fill the inputs...");
        return;
    }
    else{
        const principle = loanAmount.value;
        const rate = interestRate.value / 1200;
        const tenure = monthToPay.value;

        const emiValue = (principle * rate * (1 + rate)**tenure) / ((1+rate)**tenure -1);
        emi.textContent = emiValue.toFixed(2);
    }
}
>>>>>>> 88423350aac196a0369d0a1597bda7b79843098a
btn.addEventListener("click", EMICalculate);