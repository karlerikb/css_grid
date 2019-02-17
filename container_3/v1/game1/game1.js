// Global variables

const players = ["one", "two"];
const positionProperties = ["top", "left", "right", "bottom", "width", "height"];
const cursorProperties = ["clientX", "clientY"];
const gameboardPositionData = {};
const mouseCursorPositionData = {};
let gameTurnForPlayer = "one";
const prohibitedPositions = [];



// UI Reference Content

function fireEventUIAnimation(selector) {
  const eventUIElement = document.querySelector(`#${selector}`);
  if (!eventUIElement.classList.contains("animateEventFired")) {
    eventUIElement.addEventListener("animationend", () => { eventUIElement.classList.remove("animateEventFired") });
    eventUIElement.classList.add("animateEventFired");
  }
}

function indicateUIWhichPieceIsActive() {
  const activePieceIndicatorUI = document.querySelector("#currentActivePiece");
  const activePiece = document.querySelector(".activePiece");
  if (activePiece) {
    const pieceId = activePiece.getAttribute("id");
    const playerClass = activePiece.parentElement.parentElement.className.split(" ");
    const player = playerClass[0].charAt(0).toUpperCase() + playerClass[0].slice(1);
    const number = playerClass[1].charAt(0).toUpperCase() + playerClass[1].slice(1);
    activePieceIndicatorUI.textContent = `${player} ${number} ${pieceId}`;
    fireEventUIAnimation("currentActivePiece");
  } else {
    activePieceIndicatorUI.textContent = "No active piece";
  }
}











// When DOM Content Loads

document.addEventListener("DOMContentLoaded", () => {
  createGameboardPositionDataTable();
  createMouseCursorDataTable();
  createPlayersGamePieces();
  initializeGame();
  fireEventUIAnimation("DOMContentLoaded");
});

function createGameboardPositionDataTable() {
  createGameboardStatsTableElement();
  updateGameboardStatsTableValues();
}

function createGameboardStatsTableElement() {
  const classes = ".gameboard.stats";
  generateTableHeadingElements(classes, positionProperties);
  generateTableBodyElements(classes, positionProperties);
}

function generateTableHeadingElements(classes, properties) {
  const tr = document.querySelector(`${classes} > thead > tr`);
  properties.forEach(property => {
    const th = document.createElement("th");
    th.textContent = property;
    tr.appendChild(th);
  });
}

function generateTableBodyElements(classes, properties) {
  const tr = document.querySelector(`${classes} > tbody > tr`);
  properties.forEach(property => {
    const td = document.createElement("td");
    td.setAttribute("id", property);
    tr.appendChild(td);
  });
}

function createMouseCursorDataTable() {
  createMouseCursorDataTableElements();
  initializeMouseCursorDataTableValues();
}

function createMouseCursorDataTableElements() {
  const classes = ".mouseCursor.stats";
  generateTableHeadingElements(classes, cursorProperties);
  generateTableBodyElements(classes, cursorProperties);
}

function initializeMouseCursorDataTableValues() {
  const tableData = Array.from(document.querySelector(".mouseCursor.stats > tbody > tr").children);
  tableData.forEach(td => {
    td.textContent = 0;
  });
}

function createPlayersGamePieces() {
  players.forEach(number => {
    const playerContainer = document.querySelector(`.player.${number} .game.pieces`);
    for (let i = 1; i <= 12; i++) {
      const piece = document.createElement("div");
      piece.setAttribute("id", `piece_${i}`);
      piece.textContent = i;
      piece.addEventListener("mouseenter", handlePlayerPieceMouseEnter);
      piece.addEventListener("mouseleave", handlePlayerPieceMouseLeave);
      piece.addEventListener("click", handlePlayerPieceOnClick);
      playerContainer.appendChild(piece);
    }
  });
}



// Game Functions
let previousActivePiece;

function handlePlayerPieceMouseEnter(e) {
  const currentPlayerPieces = Array.from(document.querySelector(`.player.${gameTurnForPlayer} .game.pieces`).children);
  if (currentPlayerPieces.includes(e.target)) {
    e.target.style.background = "lightgreen";
  }
}

function handlePlayerPieceMouseLeave(e) {
  if (e.target.hasAttribute("style")) {
    e.target.removeAttribute("style");
  }
}

function handlePlayerPieceOnClick(e) {
  setPlayerPieceActive(e);
  indicateUIWhichPieceIsActive();
  createGameboardPositions();
}

function setPlayerPieceActive(e) {
  // select only current player pieces
  const currentPlayerPieces = Array.from(document.querySelector(`.player.${gameTurnForPlayer} .game.pieces`).children);

  // if currently clicked on piece is within current players pieces
  if (currentPlayerPieces.includes(e.target)) {
    const activePiece = document.querySelector(".activePiece");
    // if activePiece exists (with that class) and it's not the one currently clicked, then remove class from that element
    // (basically removing active class from a piece that's not currently clicked)
    if (activePiece && activePiece != e.target) activePiece.classList.remove("activePiece");
    // toggle between active and not active states
    e.target.classList.toggle("activePiece"); 
  }
}

function createGameboardPositions() {
  const gameboard = document.querySelector(".game.board");
  handleGameboardTemporaryPositionElements(gameboard);
}

function handleGameboardTemporaryPositionElements(gameboard) {
  const activePiece = document.querySelector(".activePiece");
  const tempPositionsSet = (document.querySelector(".tempPosition")) ? true : false;
  if (activePiece) {
    if (!tempPositionsSet) {
      addTemporaryPositionElementsToGameboard(gameboard);
    }
  } else {
    removeTemporaryPositionElementsFromGameboard();
  }
}

let prohibitedPosExists;

function addTemporaryPositionElementsToGameboard(gameboard) {
  for (let gridRow = 1; gridRow <= 5; gridRow++) {
    for (let gridColumn = 1; gridColumn <= 6; gridColumn++) {
      
      prohibitedPosExists = false;
      // console.log(prohibitedPositions);
      prohibitedPositions.forEach(prohibitedPos => {
        if (prohibitedPos.gridRowStart === gridRow && prohibitedPos.gridColumnStart === gridColumn) {
          prohibitedPosExists = true;
          // console.log(prohibitedPos);
        }
      });

      if (prohibitedPosExists) continue;

      const tempPosition = document.createElement("div");
      tempPosition.className = "tempPosition";
      tempPosition.textContent = `temp pos ${gridRow}${gridColumn}`;
      tempPosition.style.cssText = `
        grid-column-start:${gridColumn};
        grid-column-end:${gridColumn + 1};
        grid-row-start:${gridRow};
        grid-row-end:${gridRow + 1};
      `;
      tempPosition.addEventListener("click", handleTempPosOnClick);
      gameboard.appendChild(tempPosition);
    }
  }
}

function handleTempPosOnClick(e) {
  const gameboard = document.querySelector(".game.board");
  const activePiece = document.querySelector(".activePiece");
  const pieceId = activePiece.getAttribute("id");
  const playerPiece = createPlayerPieceElementOnGameboard(e, pieceId, activePiece);
  gameboard.appendChild(playerPiece);
  removeTemporaryPositionElementsFromGameboard();
  removeActivePiece();
  switchPlayerTurn();
  const activePieceIndicatorUI = document.querySelector("#currentActivePiece");
  activePieceIndicatorUI.textContent = "No active piece";
}

function getGameboardPosition(e) {
  const clickedPositionElement = e.target;
  const position = window.getComputedStyle(clickedPositionElement).gridArea;
  return position;
}

function createPlayerPieceElementOnGameboard(e, pieceId, activePiece) {
  const playerNumber = activePiece.parentElement.parentElement.className.split(" ")[1];
  const number = `player${playerNumber.charAt(0).toUpperCase() + playerNumber.slice(1)}`;
  const position = getGameboardPosition(e);

  const playerPieceElement = document.createElement("div");
  playerPieceElement.style.gridArea = position;
  playerPieceElement.className = number;
  playerPieceElement.textContent = pieceId.split("_")[1];
  playerPieceElement.setAttribute("id", `${playerNumber}_${pieceId}`);
  // console.log(position.split("/"));
  let prohibitedPosObj = {};
  prohibitedPosObj["gridRowStart"] = +(position.split("/")[0].trim());
  prohibitedPosObj["gridColumnStart"] = +(position.split("/")[1].trim());
  prohibitedPositions.push(prohibitedPosObj);
  return playerPieceElement;
}

function switchPlayerTurn() {
  gameTurnForPlayer = players.filter(player => player !== gameTurnForPlayer)[0];
  initTurnForPlayer(gameTurnForPlayer);
}

function removeActivePiece() {
  document.querySelector(".activePiece").remove();
}

function removeTemporaryPositionElementsFromGameboard() {
  const tempPositions = Array.from(document.querySelectorAll(".tempPosition"));
  tempPositions.forEach(tempPos => {
    tempPos.remove();
  });
}



function initializeGame() {
  if (gameTurnForPlayer === "one") {
    initTurnForPlayer("one");
  } else {
    initTurnForPlayer("two");
  }
}

function initTurnForPlayer(playerNumber) {
  const oppositePlayerNumber = players.filter(player => player !== playerNumber)[0];
  turnPlayer(playerNumber);
  oppositePlayer(oppositePlayerNumber);
}

function turnPlayer(number) {
  const playerHeading = document.querySelector(`.player.${number}.heading`);
  playerHeading.textContent = `Player ${number.charAt(0).toUpperCase() + number.slice(1)} (your turn)`;
}

function oppositePlayer(number) {
  const playerHeading = document.querySelector(`.player.${number}.heading`);
  playerHeading.textContent = `Player ${number.charAt(0).toUpperCase() + number.slice(1)}`;
}













// Set Gameboard Position Data Values

function updateGameboardStatsTableValues() {
  const gameboard = document.querySelector(".game.board");
  const positionData = gameboard.getBoundingClientRect();
  setGameboardStatsTableValues(positionData);
  getGameBoardStatsTableValues();
}

function setGameboardStatsTableValues(positionData) {
  positionProperties.forEach(property => {
    gameboardPositionData[property] = positionData[property];
  });
}

function getGameBoardStatsTableValues() {
  const tableDataElements = Array.from(document.querySelector(".gameboard.stats > tbody > tr").children);
  tableDataElements.forEach(td => {
    td.textContent = (gameboardPositionData[td.getAttribute("id")]).toFixed(2);
  });
}










// When Window Resize Happens

window.addEventListener("resize", () => {
  updateGameboardStatsTableValues();
  fireEventUIAnimation("resize");
});











// When Mouse Cursor Moves

document.addEventListener("mousemove", (e) => {
  updateMouseCursorDataTableValues(e);
  checkIfMouseCursorIsInContainers(e);
  fireEventUIAnimation("mousemove");
});

function updateMouseCursorDataTableValues(e) {
  setMouseCursorDataTableValues(e);
  getMouseCursorDataTableValues();
}

function setMouseCursorDataTableValues(e) {
  cursorProperties.forEach(property => {
    mouseCursorPositionData[property] = e[property];
  });
}

function getMouseCursorDataTableValues() {
  cursorProperties.forEach(property => {
    const td = document.querySelector(`.mouseCursor.stats #${property}`);
    td.textContent = mouseCursorPositionData[property];
  });
}

function checkIfMouseCursorIsInContainers(e) {
  const locationName = document.querySelector("span#cursorLocation");
  const cursorX = e.clientX, cursorY = e.clientY;
  
  const cursorInGameboard = checkIfCursorInContainer(cursorX, cursorY, ".game.board");
  const cursorInPlayerOnePieces = checkIfCursorInContainer(cursorX, cursorY, ".player.one.pieces");
  const cursorInPlayerTwoPieces = checkIfCursorInContainer(cursorX, cursorY, ".player.two.pieces");

  if (cursorInGameboard) {
    locationName.textContent = "Gameboard";
    fireEventUIAnimation("cursorLocation");
  } else if (cursorInPlayerOnePieces) {
    locationName.textContent = "Player One Pieces";
    fireEventUIAnimation("cursorLocation");
  } else if (cursorInPlayerTwoPieces) {
    locationName.textContent = "Player Two Pieces";
    fireEventUIAnimation("cursorLocation");
  } else {
    locationName.textContent = "nowhere...";
  }
}

function checkIfCursorInContainer(cursorX, cursorY, selector) {
  const container = document.querySelector(selector);
  const posData = container.getBoundingClientRect();

  const cursorInYAxis = (cursorY >= posData["top"] && cursorY <= posData["top"] + posData["height"]) ? true : false;
  const cursorInXAxis = (cursorX >= posData["left"] && cursorX <= posData["left"] + posData["width"]) ? true : false;

  return cursorInYAxis && cursorInXAxis;
}










// When Document is Scrolled

window.addEventListener("scroll", () => {
  updateGameboardStatsTableValues();
  fireEventUIAnimation("scroll");
});