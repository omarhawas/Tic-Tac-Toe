let gameState = {};
const WINNING_COMBOS = [
  ["0", "1", "2"],
  ["0", "3", "6"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
];

// =====================View===============
(function () {
  // your page initialization code here
  // the DOM will be available here
  init();
})();
const tdElements = document.querySelectorAll("td");

tdElements.forEach(function (tdElement) {
  tdElement.addEventListener("click", function (event) {
    console.log("I have been clicked", event.target.id);
    updateGameBoard(event.target.id);

    gameState.player1.selections.forEach(function (selection) {
      document.getElementById(selection).innerHTML = "X";
    });
    gameState.player2.selections.forEach(function (selection) {
      document.getElementById(selection).innerHTML = "O";
    });
  });
});

// =====================Controller================
function init() {
  gameState = {
    player1: {
      selections: [],
      name: "",
      type: "X",
    },
    player2: {
      selections: [],
      name: "",
      type: "O",
    },
    player1Turn: true,
    winner: null,
  };
}

function updateGameBoard(cell) {
  if (alreadySelected(cell)) {
    return;
  }
  if (gameState.player1Turn) {
    gameState.player1.selections.push(cell);
    gameState.player1Turn = false;
  } else {
    gameState.player2.selections.push(cell);
    gameState.player1Turn = true;
  }
  checkWinner();
}

function checkWinner() {
  const player1Won = isWinner(gameState.player1.selections);
  const player2Won = isWinner(gameState.player2.selections);
  console.log("player1Won ", player1Won);
  console.log("player2Won ", player2Won);
}

function isWinner(selections) {
  return WINNING_COMBOS.some(function (winningCombo) {
    return winningCombo.every(function (value) {
      return selections.includes(value);
    });
  });
}

function alreadySelected(cell) {
  if (
    gameState.player1.selections.includes(cell) ||
    gameState.player2.selections.includes(cell)
  ) {
    return true;
  }
  return false;
}
