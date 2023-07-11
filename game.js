// selecte the refrence of html elemnt
let plyerText = document.getElementById("playerText");
let butRestart = document.getElementById("restart");
let boxes = Array.from(document.getElementsByClassName("button-option"));

let popupRef = document.querySelector(".popup");
let msgRef = document.getElementById("message");
let newgamebutton = document.getElementById("new-game");

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

let xWonElement = document.getElementById("xWons");
let oWonElement = document.getElementById("oWons");
let tieElement = document.getElementById("tie");

let countXWon = 0;
let countOWon = 0;
let countTie = 0;

const O_Text = "O";
const X_Text = "X";
let currentPlayer = X_Text;
let spaces = Array(9).fill(null);
let count = 0;
// the state of all buttons on my game

const startGame = () => {
  boxes.forEach((elment) => elment.addEventListener("click", butClicked));
};

function butClicked(e) {
  const id = e.target.id;
  /* target >> refers to the property of an event object that represents the element 
  on which the event was triggered.*/
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    plyerText.innerText = `${currentPlayer} is playing`;

    if (playerHasWon() !== false) {
      let winning_blocks = playerHasWon();
      winning_blocks.map(
        (but) => (boxes[but].style.backgroundColor = winnerIndicator)
      );
      if (currentPlayer == X_Text) {
        countXWon++;
        xWonElement.textContent = countXWon;
        disabledButtons();
        setTimeout(() => {
          popupRef.classList.remove("hide");
          msgRef.innerHTML = "&#x1F389; <br> 'X' player Wins ";
          count = 0;
          EnabledButtons();
        }, 1500);
      } else {
        countOWon++;
        oWonElement.textContent = countOWon;
        disabledButtons();
        setTimeout(() => {
          popupRef.classList.remove("hide");
          msgRef.innerHTML = "&#x1F389; <br> 'O' player Wins ";
          count = 0;
          EnabledButtons();
        }, 1500);
      }
    }
    count++;
    currentPlayer = currentPlayer == X_Text ? O_Text : X_Text;

    if (playerHasWon() == false && count === 9) {
      countTie++;
      tieElement.textContent = countTie;
      disabledButtons();
      boxes.forEach((box) => (box.style.backgroundColor = winnerIndicator));
      setTimeout(() => {
        popupRef.classList.remove("hide");
        msgRef.innerHTML = "&#x1F60E; <br> It's a Tie ";
        count = 0;
        EnabledButtons();
      }, 1500);
    }
  }
}

newgamebutton.addEventListener("click", () => {
  restart();
  popupRef.classList.add("hide");
});

//Winning pattren array
const winningPatterns = [
  //left to rgith
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // top to bottom
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const winningPattern of winningPatterns) {
    const [a, b, c] = winningPattern;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

butRestart.addEventListener("click", restart);
//function to restart new game
function restart() {
  spaces.fill(null);
  boxes.forEach((element) => {
    element.innerText = "";
    element.style.backgroundColor = "";
  });
  currentPlayer = X_Text;
  playerText.innerHTML = "Tic Tac Toe";
}

function disabledButtons() {
  boxes.forEach((elment) => {
    elment.disabled = true;
  });
}

function EnabledButtons() {
  boxes.forEach((elment) => {
    elment.disabled = false;
  });
}

startGame();

//save the text in local storage
const countXWontDataSave = JSON.stringify(countXWon);
const countOWonDataSave = JSON.stringify(countOWon);
const countTieDataSave = JSON.stringify(countTie);

// save the item in local storage
localStorage.setItem("countXWon", countXWontDataSave);
localStorage.setItem("countOWon", countOWonDataSave);
localStorage.setItem("countTie", countTieDataSave);

// Retrieve the saved count values from local storage
const GetcountXWonDataSave = localStorage.getItem("countXWon");
const GetcountOWonDataSave = localStorage.getItem("countOWon");
const GetcountTieDataSave = localStorage.getItem("countTie");

// Parse the retrieved count values back into numbers
const NewcountXWon = JSON.parse(GetcountXWonDataSave) || 0;
const NewcountOWon = JSON.parse(GetcountOWonDataSave) || 0;
const NewcountTie = JSON.parse(GetcountTieDataSave) || 0;

// Update the corresponding elements with the retrieved counts
xWonElement.textContent = NewcountXWon;
oWonElement.textContent = NewcountOWon;
tieElement.textContent = NewcountTie;

// ... Rest of your code ...

console.log(countXWontDataSave);
console.log(countOWonDataSave);
console.log(countTieDataSave);

// Save the updated count values to local storage
localStorage.setItem("countXWon", JSON.stringify(countXWon));
localStorage.setItem("countOWon", JSON.stringify(countOWon));
localStorage.setItem("countTie", JSON.stringify(countTie));
