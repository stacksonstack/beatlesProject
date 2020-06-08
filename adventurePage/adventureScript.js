//these variables connect our code with the 'id' on the html
//we can then manipulate the variables and it will manipulate the html

var images = document.getElementById("image");
var text = document.getElementById("text");
var buttonBox = document.getElementById('buttonBox');
var input = document.getElementById('input');
const modal = document.querySelector('.modal');
var modalContent = document.getElementById("modal-c");
var alliance = document.getElementById('answer-buttons');
var headText = document.getElementById('header');

//this is the variable for the name of the character
var newBeatle;

// create a page that after you enter yur name it shows four bottons that open a modal that you can either close out or pick your aliinace
// use for each to loop thru these buttons. by the end of the for each you will go to one of the functions in buttons
var beatleAlliance = {
  john: { // call advanceTo(secenario.two)  from addJohn()
    name: "John Lennon",
    text: "You've got a ear for the music.. stick with me and we will make beautiful music!",
    description: "(+2 Legacy Point)",
    modalButton: [["John Lennon", 'AllianceModal(beatleAlliance.john)']] ,
    addButton: [["Add John", "addBeatle(beatleAlliance.john)"]],
    perk: [["Legacy", true], ["Press", false], ["Fans", false]]
  },
  paul:{
    name: "Paul McCartney",
    text: "The press cant seem to get enough of us.. stick with me if you'd like to keep your head during the press runs",
    description: "(-1 question during press)",
    modalButton: [["Paul McCartney", "AllianceModal(beatleAlliance.paul)"]],
    addButton: [["Add Paul", "addBeatle(beatleAlliance.paul)"]],
    perk: [["Legacy", false], ["Press", true], ["Fans", false]]
    },
  george: {
    name: "George Harrison",
    text: "Frankly im quite tired of this touring nonsense already.. stick with me if you'd like to survive these bloody concerts!",
    description: "(40 percent likelihood avoiding fans)",
    modalButton: [["George Harrison", "AllianceModal(beatleAlliance.george)"]],
    addButton: [["Add George", "addBeatle(beatleAlliance.george)"]],
    perk: [["Legacy", false], ["Press", false], ["Fans", true]]
},
};
var userPerk = [["Legacy", false], ["Press", false], ["Fans", false]]


var scenario = {
  one: {
    image: "threeBeatles.jpg", //fix your dog
    text: "Welcome to the band new beatle! Pick a fellow beatle to align your self with",
    buttons: [["Begin Game", "advanceNoImage(scenario.two)"]]
  },
  two: {
    image: "", //house
    text: "As the newest member of the band, you are expected to do a group press interview to address the shakeup! However your band mates want to go to the studio to record! What do you do?",
    buttons: [["Grant the press an interview", "advanceTo(scenario.three)"],["Record some music", "advanceTo(scenario.three)"]]
    // create press in another html and then we will incorporate it back. the press() funciton will hide all the the other elements and then lead to an 
    // advanceToFromPress that will unhide all the elements and besides that be the same .. add legacy points and use quiz as a template 
  },
  three: {
    image: "https://1.bp.blogspot.com/-83pWE4JxQxM/ViiOd_7nGTI/AAAAAAAADUg/yCJ8iAB-gMY/s1600/postapoc5.jpg",//"https://s4.postimg.org/t1g20apst/261819008_d4316c1bdf_o.jpg",
    text: "After deciding to skip your press run, ",
    buttons: [["continue", "advanceTo(scenario.four)"]]
  },
    four: {
    image: "https://s6.postimg.org/kz5m1cnkh/2919478782_c343d14be6_b.jpg",
    text: "Your dog has run, barking loudly, into the basement. You wonder what's down there. The door jammed when you slammed it behind you. You are going to need something to pry it back open",
    buttons: [["Follow your Dog Downstairs", "advanceTo(scenario.five)"],["Search the Kitchen for a knife", "advanceTo(scenario.five)"]]
  },
    five: {
    image: "https://s6.postimg.org/kz5m1cnkh/2919478782_c343d14be6_b.jpg",
    text: "TO BE CONTINUED...",
    buttons: []

  },

};


//this is how after we type in the character name and hit enter
//we will add the name to the variable, remove the input box and start our first scenario
input.onkeypress = function(event) {
  newBeatle =  input.value
  if (event.key == "Enter" || event.keyCode == 13) {
    input.parentNode.removeChild(input)
    clearForAlliance()
  //  showmodal()
  }
};

function clearForAlliance() { // could loop or use for each
  // call advancedTO(two) from here
  changeImage(scenario.one.image)
  changeText(scenario.one.text)
  BeatlesButtons(beatleAlliance.john.modalButton)
  BeatlesButtons(beatleAlliance.paul.modalButton)
  BeatlesButtons(beatleAlliance.george.modalButton)

}
function addBeatle(beatle) {
  for(var i = 0; i < beatle.perk.length; i++){
    if(beatle.perk[i][1]){ // here is where the perk is 
      modal.style.display = 'none'
      text.innerHTML = "You have aligned with" + beatle.name
      userPerk[i][1] = true
      changeButtons(scenario.one.buttons)
      //could append the true value to a user alliance array
    }
  }

}
//this changes the text and puts in your characters name
var changeText = function(words) {
  text.innerHTML = words.replace("new beatle", newBeatle)
};

//this takes the image link and puts it in the proper format, sending it to the html
var changeImage = function(img) {
  showImage()
  images.style.backgroundImage = "url(" + img + ")"
};

function showImage() {
  images.style.visibility = 'visible'
  images.style.display = "block"
}

function AllianceModal(beatle) { // here we will display info on what alliance does and give option to commit or exit back
  modal.style.display = "block";
  modalContent.innerHTML = "<h1>" + beatle.name + "<h1>" + "<p>" + beatle.text + "<p>" + "<p>" + beatle.description + "<br>" + "<button onClick="+beatle.addButton[0][1]+">" + beatle.addButton[0][0] + "</button>";
}

//this looks at the number of options we have set and creates enough buttons
function BeatlesButtons(beatlesList)
{
  for (var i = 0; i < beatlesList.length; i++) {
    buttonBox.innerHTML += "<button onClick="+beatlesList[i][1]+">" + beatlesList[i][0] + "</button>";
  };
}
function changeButtons(buttonList) { // should put alliance buttons in buttonBox .. call changeButtons(alliances.buttons)
  buttonBox.innerHTML = "" // style buttons using add classlist
  for (var i = 0; i < buttonList.length; i++) {
    buttonBox.innerHTML += "<button onClick="+buttonList[i][1]+">" + buttonList[i][0] + "</button>";
  };
};

//this is what moves the game along
var advanceTo = function(s) {
  changeImage(s.image)
  changeText(s.text)
  changeButtons(s.buttons)
};

var advanceNoImage = function(s) {
  images.style.visibility = 'hidden'
  images.style.display = "none"
  changeText(s.text)
  changeButtons(s.buttons)
  

}

function setScreen() {
text.innerText ="John Paul and George are looking for a new drummer since Ringo went solo! The year is 1962 and you are the last minute replacement for The Beatles American stadium tour! Whats your name? \n"
}

window.onclick = function(event) { 
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//this is the code that starts the game
setScreen()
