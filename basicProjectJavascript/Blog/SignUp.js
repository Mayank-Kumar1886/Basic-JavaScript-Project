function redirectToSignin(){
    window.location.href = "../Blog/SignIn.html"
}

function saveDataToLocalStorage(){
    const firstName = document.getElementById("firstNameInput").value;
    const lastName = document.getElementById("lastNameInput").value;
    const userName = document.getElementById("UserNameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    const userData={
        firstName: firstName,
        lastName : lastName,
        userName : userName,
        email : email,
        password : password
    }
    localStorage.setItem('userData',JSON.stringify(userData))

}
function handleSubmit(event){
    event.preventDefault();
    saveDataToLocalStorage();
    alert("Data store successFully")
}
const submitButton = document.querySelector('input[type="button"]')
submitButton.addEventListener('click',handleSubmit)