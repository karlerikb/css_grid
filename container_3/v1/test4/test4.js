const properties = ["top", "left", "right", "bottom", "width", "height"];
const containerStats = {};
let itemsStats = [];

document.addEventListener("DOMContentLoaded", () => {
  generateTableHeadings();
  generateTableBody();
  setGridContainerStats();
});

function generateTableHeadings() {
  const tableHeadings = document.querySelector(".containerStats > thead > tr");
  properties.forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    tableHeadings.appendChild(th);
  });
}

function generateTableBody() {
  const tableBody = document.querySelector(".containerStats > tbody > tr");
  properties.forEach(key => {
    const td = document.createElement("td");
    td.setAttribute("id", key);
    tableBody.appendChild(td);
  });
}


/****  NEW ITEM  ****/

function addNewItem() {
  createAndAppendGridItem();
  updateGridItemsStats();
}

function createAndAppendGridItem() {
  // select container
  const gridContainer = document.querySelector(".grid.container");
  const gridContainerLength = gridContainer.children.length;

  // create grid item
  const gridItem = document.createElement("div");
  addGridItemInformation(gridItem, gridContainerLength);
  gridContainer.appendChild(gridItem);
  setGridItemPositionStats(gridItem);
}

function addGridItemInformation(gridItem, gridContainerLength) {
  const itemNum = gridContainerLength + 1;
  gridItem.setAttribute("id", itemNum);
  gridItem.className = "grid item";
  gridItem.textContent = itemNum;
  addInfoElements(gridItem);
}

function addInfoElements(gridItem) {
  properties.forEach(key => {
    const span = document.createElement("span");
    span.className = `itemInfo`;
    span.setAttribute("id", key);
    gridItem.appendChild(span);
  });
}

function setGridItemPositionStats(gridItem) {
  const stats = gridItem.getBoundingClientRect();
  const spans = Array.from(gridItem.children);

  spans.forEach(span => {
    span.textContent = `${span.getAttribute("id")}: ${stats[span.getAttribute("id")]}`;
  });
}

function updateGridItemsStats() {
  const gridItems = Array.from(document.querySelector(".grid.container").children);
  let tempStats = [];
  let gridItemStats = {};
  gridItems.forEach(gridItem => {
    const itemInfoElements = Array.from(gridItem.children);
    itemInfoElements.forEach(span => {
      gridItemStats[span.getAttribute("id")] = +(span.textContent.split(":")[1].trim());
    });
    tempStats.push(gridItemStats);
    gridItemStats = {};
  });
  itemsStats = tempStats.slice();
  tempStats = [];
}




/****  WINDOW SIZE CHANGES EVENT  ****/

function detectWindowSizeChanges() {
  setGridContainerStats();
  setGridItemStats();
  updateGridItemsStats();
}

function setGridContainerStats() {
  const gridContainer = document.querySelector(".grid.container");
  const stats = gridContainer.getBoundingClientRect();
  updateGridContainerStats(stats);
}

function updateGridContainerStats(stats) {
  const tableData = Array.from(document.querySelectorAll(".containerStats td"));
  tableData.forEach(td => {
    td.textContent = stats[td.getAttribute("id")];
    containerStats[td.getAttribute("id")] = stats[td.getAttribute("id")];
  });
}


function setGridItemStats() {
  const gridItems = document.querySelector(".grid.container");
  if (gridItems.children.length > 0) initGridItemStats(Array.from(gridItems.children));
  updateGridItemsStats();
}

function initGridItemStats(gridItems) {
  gridItems.forEach(gridItem => {
    setGridItemPositionStats(gridItem);
  });
}









/****  MOUSE MOVE EVENT  ****/

let tempItemPositions;

const clientX = document.querySelector(".cursorStats .cursor.mouse.clientX");
const clientY = document.querySelector(".cursorStats .cursor.mouse.clientY");

document.onmousemove = (e) => {
  const x = e.clientX;
  const y = e.clientY;
  clientX.textContent = x;
  clientY.textContent = y;
  checkIfCursorIsInGridContainer(x, y);
  changeTempItemPositions();
  setGridItemStats();
};

function checkIfCursorIsInGridContainer(cursorX, cursorY) {
  let containerTopIsVisible = false;
  if (containerStats.top >= 0) containerTopIsVisible = true;
  if (containerTopIsVisible) indicateCursorIsInContainer(cursorX, cursorY);
}

function changeTempItemPositions() {
  const tempItem = document.querySelector("#tempGridItem");
  if (tempItem) {
    tempItem.style.gridColumnStart = tempItemPositions["colStart"];
    tempItem.style.gridColumnEnd = tempItemPositions["colEnd"];
    tempItem.style.gridRowStart = tempItemPositions["rowStart"];
    tempItem.style.gridRowEnd = tempItemPositions["rowEnd"];
  }
}

function indicateCursorIsInContainer(cursorX, cursorY) {
  const container = document.querySelector(".grid.container");
  let cursorInYAxis = (cursorY >= containerStats["top"] && cursorY <= containerStats["top"] + containerStats["height"]) ? true : false;
  let cursorInXAxis = (cursorX >= containerStats["left"] && cursorX <= containerStats["left"] + containerStats["width"]) ? true: false;
  if (cursorInXAxis && cursorInYAxis) {
    // container.style.background = "lightgreen";
    tempItemPositions = getTempItemPosBasedOnCursor(cursorX, cursorY);
    // console.log(positions);
    generateTempGridItem(container);
  } else {
    // container.style.background = "lightgoldenrodyellow";
    removeTempGridItem();
  }
}

function getTempItemPosBasedOnCursor(cursorX, cursorY) {
  const gridPositions = {};
  const gridRows = 3;
  const gridCols = 3;
  const top = containerStats["top"];
  const left = containerStats["left"];
  const itemHeight = containerStats["height"] / gridRows;
  const itemWidth = containerStats["width"] / gridCols;
  const gridItemRowPosBase = Math.floor((cursorY - top) / itemHeight);
  gridPositions["rowStart"] = gridItemRowPosBase + 1;
  gridPositions["rowEnd"] = gridItemRowPosBase + 2;
  const gridItemColPosBase = Math.floor((cursorX - left) / itemWidth);
  gridPositions["colStart"] = gridItemColPosBase + 1;
  gridPositions["colEnd"] = gridItemColPosBase + 2;
  return gridPositions;
}

function generateTempGridItem(container) {
  const tempItem = document.querySelector("#tempGridItem");
  if (!tempItem) {
    const item = document.createElement("div");
    item.setAttribute("id", "tempGridItem");
    item.textContent = "This is a temporary Grid Item!";
    container.appendChild(item);
  }
}

function removeTempGridItem() {
  const tempItem = document.querySelector("#tempGridItem");
  if (tempItem) tempItem.remove();
}


function checkIfCursorInA11Cell(cursorX, cursorY) {
  const container = document.querySelector(".grid.container");

}









/****  SCROLL EVENT  ****/
window.addEventListener("scroll", () => {
  setGridContainerStats();
  setGridItemStats();
  updateGridItemsStats();
});