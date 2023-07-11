// function show who the winner
function winMassge() {
  popupRef.classList.remove("hide");
}

// to show who is winner
const winChecker = (letter) => {
  //loop through all win patterns
  for (let i of winningPattern) {
    let [elemnt1, elemnt2, elemnt3] = [
      butRef[i[0]].innerText,
      butRef[i[1]].innerText,
      butRef[i[2]].innerText,
    ];
    //check if elements are filled
    // if 3 empty elements are same and would give win as would

    let count = 0;
    if (elemnt1 !== "" && elemnt2 !== "" && elemnt3 !== "") {
      if (elemnt1 == elemnt2 && elemnt2 == elemnt3) {
        winMassge();
      }
    }
  }

  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' player Wins ";
  } else if (letter == "O") {
    msgRef.innerHTML = "&#x1F389; <br> 'O' player Wins ";
  }
  // else {
  //   msgRef.innerHTML = "&#x1F60E; <br> It's a Tie ";
  // }
};

//Display X/O on click
gameStart();

//fuction to start game
function gameStart() {
  //Player 'X' plays first
  let count = 0;
  let xTurn = true;
  butRef.forEach((elment) => {
    elment.addEventListener("click", function () {
      if (xTurn) {
        elment.textContent = "X";
        elment.disabled = true;
        xTurn = false;
        count++;
      } else {
        elment.textContent = "O";
        elment.disabled = true;
        xTurn = true;
        count++;
      }

      let letter = "T";
      winChecker(letter);
    });
  });
}

//function to make the buttons able to clicked when I restart the game..
function resetGame() {
  let buttons = document.querySelectorAll(".button-option");
  buttons.forEach((elment) => {
    elment.disabled = false;
    elment.textContent = "";
  });
  gameStart();
}

//when the one of palyer is win
newgamebutton.addEventListener("click", () => {
  resetGame();
  popupRef.classList.add("hide");
});

// if (count !== 9) {
// }

// let letter;
// if (!xTurn) {
//   letter = "X";
// } else {
//   letter = "O";
// }

// if (count === 9) {
//   letter = "T";
//   console.log("Tt's a 9");
// }

// let result = winChecker(letter);
// if (result) {
//   count = 0;
// }
