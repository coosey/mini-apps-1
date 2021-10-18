// get all elements
//let board = document.querySelectorAll("#board");
let player = "X";
let game = {};
// create a clickHandler for cells
function boardHandler() {
    let table = document.getElementById("board");
    let cells = table.getElementsByTagName("td");
    
    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute("onClick", "handleCellClick(this)");
    }
}
// create a handler for cell click, create object to store value
function handleCellClick(clickedCell) {
    let position = clickedCell.getAttribute("id");
    if (game[position]) {
        alert("This spot is taken!")
    } else {
        game[position] = player;
        clickedCell.innerHTML = player;
        handlePlayer();
    }
}

function handlePlayer() {
    if (player === "X") {
        player = "O";
    } else {
        player = "X";
    }
}

// implement handleResult for winConditions
function handleResults() {
}


// set up conditions to win here
// check later: did we add all conditions?
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boardHandler();
handleResults();