const properties = ["top", "left", "right", "bottom", "width", "height"];

document.addEventListener("DOMContentLoaded", () => {
  // generateTableHeadings();
  setGridContainerStats();
});


function addNewItem() {
  createAndAppendGridItem();
}

function createAndAppendGridItem() {
  const gridContainer = document.querySelector(".grid.container");
  const gridContainerLength = gridContainer.children.length;
  const gridItem = document.createElement("div");
  addGridItemInformation(gridItem, gridContainerLength);
  gridContainer.appendChild(gridItem);
  setGridItemPositionStats(gridItem);
}

function setGridItemPositionStats(gridItem) {
  const stats = gridItem.getBoundingClientRect();
  const spans = Array.from(gridItem.children);
  properties.forEach(key => {
    spans.forEach(span => {
      if (key === span.getAttribute("id")) span.textContent = `${key}: ${stats[key]}`;
    });
  });
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


function detectWindowSizeChanges() {
  emptyStats();
  setGridContainerStats();
  setGridItemStats();
}

function setGridItemStats() {
  const gridItems = document.querySelector(".grid.container");
  if (gridItems.children.length > 0) initGridItemStats(Array.from(gridItems.children));
}

function initGridItemStats(gridItems) {
  gridItems.forEach(gridItem => {
    const itemNum = gridItem.getAttribute("id");
    gridItem.innerHTML = "";
    gridItem.textContent = itemNum;
    addInfoElements(gridItem);
    setGridItemPositionStats(gridItem);
  });
}

function emptyStats() {
  const tableHeadings = document.querySelector(".containerStats > thead > tr");
  const tableBody = document.querySelector(".containerStats > tbody > tr");
  tableHeadings.innerHTML = "";
  tableBody.innerHTML = "";
}

function setGridContainerStats() {
  const gridContainer = document.querySelector(".grid.container");
  const stats = gridContainer.getBoundingClientRect();
  // console.log(stats);
  generateBoundingRectStats(stats);
}

function generateBoundingRectStats(stats) {
  // const stats = gridContainer.getBoundingClientRect();
  generateTableHeadings();
  generateTableBody(stats)
}

function generateTableHeadings() {
  const tableHeadings = document.querySelector(".containerStats > thead > tr");
  properties.forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    tableHeadings.appendChild(th);
  });
}

function generateTableBody(stats) {
  const tableBody = document.querySelector(".containerStats > tbody > tr");
  properties.forEach(key => {
    const td = document.createElement("td");
    td.textContent = stats[key];
    tableBody.appendChild(td);
  });
}



/* mouse move */
const clientX = document.querySelector(".cursorStats .cursor.mouse.clientX");
const clientY = document.querySelector(".cursorStats .cursor.mouse.clientY");

document.onmousemove = (e) => {
  // console.log(e);
  clientX.textContent = e.clientX;
  clientY.textContent = e.clientY;
};