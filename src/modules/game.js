import player from './player';
import gameboard from './gameboard';
import ship from './ship';

export default function game() {
    // players, respective boards
    const players = [new player(), new player('bot')];
    const boards = [new gameboard(), new gameboard()];

    function placeShips() {
        const board1 = boards[0];
        const board2 = boards[1];
        const battleship1 = new ship(3);
        const battleship2 = new ship(3);
        board1.addShip(battleship1, [0, 0], 'x');
        board2.addShip(battleship2, [2, 2], 'x');
        console.log(boards[0].getBoard());
    }

    /* Loop through the two boards
    for each of them, do a double for loop 10 by 10
    get the value at each coordinate of the board, if its
    'M', mark it as dark grey
    'H', red
    '' or numbers, white
    when hover, turn to whitish grey
    */
    function redraw() {
        // colour the blocks on the boards and add hover effect depending on
        // which player it belongs to and the value of the coord
        function createBlock(value, boardName, coord) {
            const newBlock = document.createElement('div');

            // Set the class based on the value at the coordinate
            newBlock.className = 'block';
            const [x, y] = coord;
            newBlock.dataset.x = x;
            newBlock.dataset.y = y;

            // modify the colour through class, as directly modifying the colour
            // will also override the color of the hover state

            // M, both, dark grey
            // H, both, red
            // ships (numbers), me, green
            // '', both, white
            // hover, enemy, white
            if (value === 'M') {
                newBlock.classList.add('dark-grey');
            } else if (value === 'H') {
                newBlock.classList.add('red');
            } else if (typeof value === 'number' && boardName === 'board1') {
                newBlock.classList.add('green');
            } else {
                newBlock.classList.add('white');
                // separate class created to add hover effect
                if (boardName === 'board2')
                    newBlock.classList.add('hover-block');
            }

            return newBlock;
        }

        // redraw different boards
        function redrawBoard(board, boardName) {
            // get the board to modify
            const boardElement = document.querySelector(`#${boardName}`);
            // remove previous board before drawing the new one
            boardElement.innerHTML = '';

            for (let i = 0; i < 10; i++) {
                const newRow = document.createElement('div');
                newRow.className = 'row'; // Add a class to the row
                for (let j = 0; j < 10; j++) {
                    const value = board[i][j];
                    const newBlock = createBlock(value, boardName, [i, j]);
                    newRow.appendChild(newBlock);
                }
                boardElement.appendChild(newRow);
            }
        }
        redrawBoard(boards[0].getBoard(), 'board1');
        redrawBoard(boards[1].getBoard(), 'board2');
    }

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
        players[0].attack(boards[1], clickedCoordinates);
        players[1].attack(boards[0]);

        // Remove click event listeners before redrawing
        removeClickEventListenersForBoard();

        redraw();
        isGameOver();
    };

    /* Add the attack event to the blocks */
    function addClickEventListenersForBoard() {
        const boardElement = document.querySelector('#board2');

        // Add click event listeners to each block in the board
        const blocks = boardElement.querySelectorAll('.block');
        blocks.forEach((block) => {
            block.addEventListener('click', clickHandler);
        });
    }

    function removeClickEventListenersForBoard() {
        const boardElement = document.querySelector('#board2');

        // Remove click event listeners from each block in the board
        const blocks = boardElement.querySelectorAll('.block');
        blocks.forEach((block) => {
            block.removeEventListener('click', clickHandler);
        });
    }

    function checkWinner() {
        if (boards[0].isAllSunken()) return 'bot';
        if (boards[1].isAllSunken()) return 'player';
    }

    // Function to check for a winner and end the game
    function isGameOver() {
        const winner = checkWinner();
        if (winner) {
            // Display the winner
            if (winner === 'bot') {
                console.log('you lose');
            } else {
                console.log('YOU WIN!!!');
            }
        } else {
            // Continue the game by switching turns
            addClickEventListenersForBoard();
        }
    }

    function startGame() {
        placeShips();

        // call redraw
        redraw();
        isGameOver();
    }

    return {
        startGame
    };
}
