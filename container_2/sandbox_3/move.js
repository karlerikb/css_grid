const box = document.querySelector(".moveBox");

document.querySelector(".controls > .start").addEventListener("click", startAnimation);
document.querySelector(".controls > .clear").addEventListener("click", clearAnimation);


function startAnimation() {
    if (!box.classList.contains("animate")) {
        box.classList.add("animate");
    }
}

function clearAnimation() {
    
    if (box.classList.contains("animate")) {
        box.classList.remove("animate");
    }
}






/* Test 2 */

const from = document.querySelector(".from");
const to = document.querySelector(".to");
const test = document.querySelector(".test");

console.log(to);

let fromGridCol = window.getComputedStyle(from).gridColumnStart;
let fromGridRow = window.getComputedStyle(from).gridRowStart;
console.log(fromGridCol, fromGridRow);

let toGridCol = window.getComputedStyle(to).gridColumnStart;
let toGridRow = window.getComputedStyle(to).gridRowStart;
console.log(toGridCol, toGridRow);



const testPos = test.getBoundingClientRect();
console.log(testPos.left, testPos.top);

const fromPos = from.getBoundingClientRect();
console.log(fromPos.left, fromPos.top);

const toPos = to.getBoundingClientRect();
console.log(toPos.left, toPos.top);






leftPos = window.getComputedStyle(document.querySelector(".test")).getPropertyValue("left");
topPos = window.getComputedStyle(document.querySelector(".test")).getPropertyValue("top");

//console.log(leftPos, topPos);





const root = document.querySelector(":root");

const moveGridItem = document.querySelector(".controls > .moveGridItem");
console.log(moveGridItem);

moveGridItem.addEventListener("click", () => {
    console.log("clicked");
    root.style.setProperty("--left-pos-from", Math.abs(fromPos.left - testPos.left) + "px");
    root.style.setProperty("--left-pos-to", Math.abs(toPos.left - testPos.left) + "px");
    root.style.setProperty("--top-pos-from", Math.abs(fromPos.top - testPos.top) + "px");
    root.style.setProperty("--top-pos-to", Math.abs(toPos.top - testPos.top) + "px");

    root.style.setProperty("--grid-row-from", fromGridRow);
    root.style.setProperty("--grid-row-to", toGridRow);
    root.style.setProperty("--grid-column-from", fromGridCol);
    root.style.setProperty("--grid-column-to", toGridCol);

    test.classList.toggle("animateGridItem");
});


test.addEventListener("animationend", () => {
    console.log("animation ended");
    test.classList.add("animationComplete");
    if (test.classList.contains("animateGridItem")) {
        test.classList.remove("animateGridItem");
    }
    const clearBtn = document.querySelector(".clearAnimationBtn");
    if (clearBtn.classList.contains("display-none")) {
        clearBtn.classList.remove("display-none");
    }

    const animateBtn = document.querySelector(".moveGridItem");
    if (!animateBtn.classList.contains("display-none")) {
        animateBtn.classList.add("display-none");
    }
});



document.querySelector(".clearAnimationBtn").addEventListener("click", clearAnimation);

function clearAnimation() {
    location.reload();
}