function redirectToSignin(){
    window.location.href = "../Blog/SignIn.html"
}
function redirectToSignUp(){
    window.location.href = "../Blog/SignIn.html"
}
function redirectToChoiceBlog(){
    window.location.href ="../Blog/ChoiceBlog.html"
}
function redirectToAbout(){
    window.location.href = "../Blog/About.html"
}
function redirectToServices(){
    window.location.href = "../Blog/Services.html"
}
function redirectToContactUs(){
    window.location.href = "../Blog/Contact.html"
}


// JavaScript to toggle the navigation menu
function toggleNavMenu() {
    var navbar = document.querySelector('.navbar-nav');
    navbar.classList.toggle('show-nav');
  }
  
  // Function to be called when the hamburger menu button is clicked
  function onHamburgerClick() {
    toggleNavMenu();
  }
  
  // Attach the click event listener to the hamburger menu button
  var hamburgerBtn = document.querySelector('.hamburger-btn');
  hamburgerBtn.addEventListener('click', onHamburgerClick);



