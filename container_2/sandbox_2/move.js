const box1 = document.querySelector(".grid2 > .box1");
/* console.log(box1); */

let columnStart = 2;
let columnEnd = 10;

let rowStart = 2;
let rowEnd = 10;

function buttonEventListeners(moveUp, moveDown, moveLeft, moveRight) {
    const up = document.querySelector(".buttons > .up");
    const down = document.querySelector(".buttons > .down");
    const left = document.querySelector(".buttons > .left");
    const right = document.querySelector(".buttons > .right");

    up.addEventListener("click", moveUp);
    down.addEventListener("click", moveDown);
    left.addEventListener("click", moveLeft);
    right.addEventListener("click", moveRight);

    document.querySelector("body").addEventListener("keydown", moveKey);
}

buttonEventListeners(moveUp, moveDown, moveLeft, moveRight);


function moveUp(e) {
    console.log("clicked moveUp");
    /* console.log(e); */

    if (rowEnd > 10) {
        rowStart--;
        rowEnd--;
    }

    box1.style.gridRow = `${rowStart} / ${rowEnd}`;

    console.log(`column: ${columnStart} / ${columnEnd}`);
    console.log(`row: ${rowStart} / ${rowEnd}`);

    console.log(box1.style);
    //box1.style.background = "blue";
}
function moveDown(e) {
    console.log("clicked moveDown");
    /* console.log(e); */

    if (rowEnd < 100) {
        rowStart++;
        rowEnd++;
    }

    box1.style.gridRow = `${rowStart} / ${rowEnd}`;

    console.log(`column: ${columnStart} / ${columnEnd}`);
    console.log(`row: ${rowStart} / ${rowEnd}`);
}
function moveLeft(e) {
    console.log("clicked moveLeft");
    /* console.log(e); */

    if (columnEnd > 10) {
        columnStart--;
        columnEnd--;
    }

    box1.style.gridColumn = `${columnStart} / ${columnEnd}`;

    console.log(`column: ${columnStart} / ${columnEnd}`);
    console.log(`row: ${rowStart} / ${rowEnd}`);
}
function moveRight(e) {
    console.log("clicked moveRight");
    /* console.log(e); */

    if (columnEnd < 100) {
        columnStart++;
        columnEnd++;
    }

    box1.style.gridColumn = `${columnStart} / ${columnEnd}`;

    console.log(`column: ${columnStart} / ${columnEnd}`);
    console.log(`row: ${rowStart} / ${rowEnd}`);
}



function moveKey(e) {
    /* console.log(e); */

    /* if (e.keyCode === 38 && rowEnd > 10) {
        rowStart--;
        rowEnd--;
    } */

    if (e.keyCode === 38 && rowEnd > 10) {
        console.log("up");
        rowStart--;
        rowEnd--;
    }
    if (e.keyCode === 40 && rowEnd < 100) {
        console.log("down");
        rowStart++;
        rowEnd++;
    }
    if (e.keyCode === 37 && columnEnd > 10) {
        console.log("left");
        columnStart--;
        columnEnd--;
    }
    if (e.keyCode === 39 && columnEnd < 100) {
        console.log("right");
        columnStart++;
        columnEnd++;
    }

    box1.style.gridRow = `${rowStart} / ${rowEnd}`;
    box1.style.gridColumn = `${columnStart} / ${columnEnd}`;

    e.preventDefault();
}
