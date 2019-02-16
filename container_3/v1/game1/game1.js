// Global variables

const positionProperties = ["top", "left", "right", "bottom", "width", "height"];
const cursorProperties = ["cursorX", "cursorY"];
const gameboardPositionData = {};


// UI Reference Content

function fireEventUIAnimation(eventType) {
  const eventUIElement = document.querySelector(`#${eventType}`);
  if (!eventUIElement.classList.contains("animateEventFired")) {
    eventUIElement.addEventListener("animationend", () => { eventUIElement.classList.remove("animateEventFired") });
    eventUIElement.classList.add("animateEventFired");
  }
}


// When DOM Content Loads

document.addEventListener("DOMContentLoaded", () => {
  createGameboardPositionDataTable();
  createMouseCursorDataTable();
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
}

function createMouseCursorDataTableElements() {
  const classes = ".mouseCursor.stats";
  generateTableHeadingElements(classes, cursorProperties);
  generateTableBodyElements(classes, cursorProperties);
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

  fireEventUIAnimation("mousemove");
});

