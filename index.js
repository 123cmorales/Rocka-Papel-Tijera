var selectionButtons = document.querySelectorAll("[data-selection]");
var finalColumn = document.querySelector("[data-final-column]");
var computerScoreSpan = document.querySelector("[data-computer-score]");
var yourScoreSpan = document.querySelector("[data-your-score]");
var SELECTIONS = [
  {
    name: "rock",
    emoji: "🗿",
    beats: "scissors"
  },
  {
    name: "paper",
    emoji: "📜",
    beats: "rock"
  },
  {
    name: "scissors",
    emoji: "✂️",
    beats: "paper"
  }
];

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    var selectionName = selectionButton.dataset.selection;
    var selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  var computerSelection = randomSelection();
  var yourWinner = isWinner(selection, computerSelection);
  var computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) incrementScore(yourScoreSpan);
  if (computerWinner) incrementScore(computerScoreSpan);
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
  var div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}
