function addNewItem() {
  createAndAppendGridItem();
}

function createAndAppendGridItem() {
  const gridContainer = document.querySelector(".grid.container");
  const gridItem = document.createElement("div");
  gridItem.className = "grid item";
  gridItem.textContent = gridContainer.children.length + 1;
  gridContainer.appendChild(gridItem);
}