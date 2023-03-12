const gameboard = document.querySelector(".gameboard");
const startCells = ["", "", "", "", "", "", "", "", ""];
const gameInfo = document.querySelector(".gameInfo");
let go = "cross";

gameInfo.style.marginTop = "20px";

gameInfo.textContent = " Cross is first";

createBoard();
function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    gameboard.append(cellElement);
    cellElement.addEventListener("click", addGo);
  });
}

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  if (go === "cross") {
    go = "circle";
  } else {
    go = "cross";
  }
  gameInfo.textContent = `It's now ${go}'s go`;
  e.target.append(goDisplay);
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquare = document.querySelectorAll(".square");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  winningCombos.forEach((array) => {
    let crossWins = array.every((cell) =>
      allSquare[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      gameInfo.textContent = "Cross is wins";
      const div = document.createElement("div");
      div.className = "crossWins";
      const text = document.createTextNode(gameInfo.textContent);
      div.appendChild(text);
      document.querySelector("body").appendChild(div);
      allSquare.forEach((square) => square.replaceWith(square.cloneNode(true)));
      return;
    }
  });

  winningCombos.forEach((array) => {
    let circleWins = array.every((cell) =>
      allSquare[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      gameInfo.textContent = "Circle is wins";
      const div = document.createElement("div");
      div.className = "circleWins";
      const text = document.createTextNode(gameInfo.textContent);
      div.appendChild(text);
      document.querySelector("body").appendChild(div);
      allSquare.forEach((square) => square.replaceWith(square.cloneNode(true)));
      return;
    }
  });
}
