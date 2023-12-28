/* Get the coordinate of the block clicked */
function getClickedCoordinates(event) {
    const clickedBlock = event.target;
    const x = parseInt(clickedBlock.dataset.x, 10);
    const y = parseInt(clickedBlock.dataset.y, 10);

    // Return the coordinates as an array
    return [x, y];
}

/* Attack the enemy board using the coordiante
    switch turn after attacking */
const clickHandler = (event) => {
    const clickedCoordinates = getClickedCoordinates(event);
    // Perform the attack for the current player
    players[currentPlayer].attack(clickedCoordinates);
    alert('click');

    // After the attack, switch to the next turn
    switchTurn();
};

/* Add the attack event to the blocks */
function addClickEventListenersForBoard() {
    const boardElement = document.querySelector('#board2');

    // Add click event listeners to each block in the board
    const blocks = boardElement.querySelectorAll('block');
    blocks.forEach((block) => {
        block.addEventListener('click', clickHandler);
    });
}

/* Remove event listeners to make it turn based */
function removeEventListeners() {
    const boardElement = document.querySelector('board2');

    // Remove click event listeners from each block in the board
    const blocks = boardElement.querySelectorAll('block');
    blocks.forEach((block) => {
        block.removeEventListener('click', clickHandler);
    });
}

/* Add the event listener based on the current player's mode */
function addEventListeners() {
    if (currentPlayer === 0) {
        // human
        addClickEventListenersForBoard();
    } else {
        // bot
        players[currentPlayer].attack(boards[0]);
    }
}
