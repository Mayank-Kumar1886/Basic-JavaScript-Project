document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const userName = document.getElementById("userName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("confirm-password");
  const userNameError = document.getElementById("error-name");
  const emailError = document.getElementById("error-email");
  const errorPassword = document.getElementById("error-password");
  const errorConfirmPassword = document.getElementById("error-password-confirm");

 

  // ------------------ VALIDATIONS -------------------
  const ValidateUserName = () => {
    if (userName.value === "") {
      userNameError.innerText = "User name is required";
      userNameError.style.color = "red";
      return false;
    } else if (userName.value.length < 3) {
      userNameError.innerText = "User name must be at least 3 characters";
      userNameError.style.color = "red";
      return false;
    } else {
      const userNameRegex = /^[a-zA-Z0-9_]{3,15}$/;
      if (!userNameRegex.test(userName.value)) {
        userNameError.innerText = "User name is not valid";
        userNameError.style.color = "red";
        return false;
      } else {
        userNameError.innerText = "User name is valid";
        userNameError.style.color = "green";
        return true;
      }
    }
  };

  const validateEmail = () => {
    if (email.value === "") {
      emailError.innerText = "Email is required";
      emailError.style.color = "red";
      return false;
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email.value)) {
        emailError.innerText = "Email is not valid";
        emailError.style.color = "red";
        return false;
      } else {
        emailError.innerText = "Email is valid";
        emailError.style.color = "green";
        return true;
      }
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    errorPassword.innerText = "";
    errorConfirmPassword.innerText = "";

    if (password.value === "") {
      errorPassword.innerText = "Password is required";
      errorPassword.style.color = "red";
      return false;
    }

    if (!passwordRegex.test(password.value)) {
      errorPassword.innerText =
        "Password must be at least 6 characters, include upper/lowercase, number, and symbol.";
      errorPassword.style.color = "red";
      return false;
    } else {
      errorPassword.innerText = "Password is valid";
      errorPassword.style.color = "green";
    }

    if (passwordConfirm.value === "") {
      errorConfirmPassword.innerText = "Please confirm your password";
      errorConfirmPassword.style.color = "red";
      return false;
    }

    if (password.value !== passwordConfirm.value) {
      errorConfirmPassword.innerText = "Passwords do not match";
      errorConfirmPassword.style.color = "red";
      return false;
    } else {
      errorConfirmPassword.innerText = "Passwords match";
      errorConfirmPassword.style.color = "green";
      return true;
    }
  };

  // ------------------ REGISTRATION -------------------
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isUserNameValid = ValidateUserName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isUserNameValid && isEmailValid && isPasswordValid) {
      const newUser = {
        userName: userName.value,
        email: email.value,
        password: password.value,
      };
      const existingUsers = JSON.parse(localStorage.getItem("registrationData")) || [];

      const userExists = existingUsers.some((user)=>{
         user.userName === newUser.userName ||
           user.email === newUser.email 
      })
      if(userExists){
        alert("❌ User already exists with this username or email.");
      }
      else{
        existingUsers.push(newUser);
      localStorage.setItem("registrationData", JSON.stringify(existingUsers));

      alert("✅ Registration successful!");
      form.reset();
      }
    }
    else {
    console.log("❌ Validation failed. Data not saved.");
    }
  });

 
})