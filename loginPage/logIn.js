var userNameArray = ["securethebags", "stacksonstack", "canadarulez", "mondays", "gohomejojo" , "pennylane", "default" ];
var fullNameArray = ["Anthony Jimenez", "Stacey Carrillo", "Justin Tredau", "Garfield", "Paul McCartney", "John Lennon", ""];
var passwordArray = ["paxman93", "maxthemax", "ontarian", "theciric", "1234", "beatles4ever", "nycity"];

// Get the modal
var modal = document.getElementById("myModal");
var loginResult = document.getElementById("result")
const hideContainer = document.getElementById('cont')
const hideNavBar = document.getElementById('ulhide')
var successContainer = document.getElementById('success')
// Get the button that opens the modal
var btn = document.getElementById("account");
var btnRegister = document.getElementById("register")
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function restoreSavedState() {
  if (localStorage && localStorage["userName"] &&
localStorage["fullName"] && (localStorage["password"] === true))
  {
    push(localStorage.getItem('userName'), localStorage.getItem('password'), localStorage.getItem('fullName'))
  }
}
restoreSavedState()
function logIn() {
 var passRight = false;
  var userRight = false; 
    var username = document.getElementById("user").value
    var password = document.getElementById("pass").value
    for(var i = 0; userNameArray.length > i; i++) {
    if(username == userNameArray[i] || username == localStorage.getItem('userName')) {
        if(password == passwordArray[i] || password == localStorage.getItem('password')){
            loginResult.innerHTML = "Success!"
            userRight = true; // SEND MESSAGE OF INCOMPLETION 
            passRight = true;
            // SUCESS OUTCOME WILL SEND INFO EITHER TO SERVER OR JSON FILE
            // reveal button that allows you to move on
            //or link directly to homepage
            displayOptionForHomePage()
        }
        else{
            userRight = true;
        }
    }
}

if(!userRight) {
  loginResult.innerHTML = "You dont seem to have credentials. Consider creating an account"
}
else if(!passRight){
  loginResult.innerHTML = "You did not enter a valid password"
}


  function newFunction() {
    restoreSavedState();
  }
};

btnRegister.onclick = function() {
    var firstName = document.getElementById("fname").value
    var lastName = document.getElementById("lname").value
    var username = document.getElementById("uname").value 
    for(var i = 0; userNameArray.length > i; i++) {
      if(userNameArray[i] == username){
        do {
        username = prompt("That username is already taken! please enter a different one")
        for(var n = 0; userNameArray.length > n; n++) {
          if(userNameArray[n] == username){
            username = prompt("Once again you picked a username that isnt available")
          }
          else{
            break
        } }
        }while(userNameArray[i] == username)
      }
    }
    console.log(username)
    var password = document.getElementById("secondPass").value
    var rePassword = document.getElementById("rePass").value
    if(password != rePassword){
      do{
      password= prompt("Enter your new password")
      rePassword = prompt("ReEnter your password to confirm!")
      }while(password != rePassword)
    }
    var fullName = firstName + " " + lastName;
    localStorage.setItem("fullName", fullName);
    localStorage.setItem('userName', username);
    localStorage.setItem('password', password);
    push(localStorage.getItem('userName'), localStorage.getItem('password'), localStorage.getItem('fullName'))
    // hide modal change text to see succesfully registered
    
console.log(userNameArray);
}

function hide(ourElement) {
  return ourElement.classList.add("hidden")
}

function displayOptionForHomePage() {
  hide(hideContainer)
  hide(hideNavBar)
  successContainer.innerHTML = '<a href = "homepage.html"><button id="sbutton" >Go to homepage</button></a>';

}
function push(user, pass, name) {
userNameArray.push(user);
passwordArray.push(pass);
fullNameArray.push(name);
}

// EXCEPTION HANDLING WHATIF IN PROMPT THEY CANCEL OUT? THEN WE CAN KEEP PROMPT WHILE PROMPT EQUALS = ""

// function createAccount() check username against the array to see if its available 
// password = reentered .. then push to the array and link to the homepage 
// BUT THERE NEVER TELL U WHEN U BEINGLIKE CHirst 