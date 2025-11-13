const input = document.querySelector('#password');
const output = document.querySelector('#output');

input.addEventListener('keyup', () => {
  let password = input.value;

  const securePasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-z])(?=.*\d).{8,}$/;
  const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const weakPasswordRegex = /^([a-zA-Z]{1,5}|\d{1,5})$/;

  if (password.length < 6) {
    output.innerText = "Password is too short";
    output.style.color = "red";
  } else if (securePasswordRegex.test(password)) {
    output.innerText = "✅ Password is secure";
    output.style.color = "green";
  } else if (mediumPasswordRegex.test(password)) {
    output.innerText = "⚠️ Password is medium";
    output.style.color = "orange";
  } else if (weakPasswordRegex.test(password)) {
    output.innerText = "❌ Password is weak";
    output.style.color = "red";
  } else {
    output.innerText = "Password does not meet criteria";
    output.style.color = "gray";
  }
});
