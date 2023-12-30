import player from './player';
import gameboard from './gameboard';
import ship from './ship';
import randomCoord from './random-coord';

export default function game() {
    // players, respective boards
    const players = [new player(), new player('bot')];
    const boards = [new gameboard(), new gameboard()];

    // const board1 = boards[0];
    // const board2 = boards[1];
    // const battleship1 = new ship(3);
    // const battleship2 = new ship(3);
    // board1.addShip(battleship1, [0, 0], 'x');
    // board2.addShip(battleship2, [2, 2], 'x');
    // console.log(boards[0].getBoard());

    function placeShips() {
        const playerShips = [
            new ship(2),
            new ship(3),
            new ship(3),
            new ship(4),
            new ship(5)
        ];

        const botShips = [
            new ship(2),
            new ship(3),
            new ship(3),
            new ship(4),
            new ship(5)
        ];

        // current ship placement axis
        let axis = 'x';

        // current ship placement board
        const placeShipsOverlay = document.querySelector(
            '.place-ship-container'
        );

        function redrawPlacementBoard() {
            redrawBoard(boards[0].getBoard(), 'place-ships-map');
        }

        // randomly place all the bot ships
        // get random coord (from player)
        // try place ship at coord (from board)
        // while ships.length !== 0, continue the above
        function placeBotShips() {
            const randomCoord1 = randomCoord();
            while (botShips.length !== 0) {
                const currentShip = botShips.pop();
                const coord = randomCoord1.getRandomCoord();
                if (!boards[1].addShip(currentShip, coord, axis)) {
                    botShips.push(currentShip);
                }
            }
        }

        function addPlacementListeners() {
            // add event listeners
            // button to change the axis
            function changeAxis() {
                if (axis === 'x') {
                    axis = 'y';
                } else {
                    axis = 'x';
                }
            }

            const axisButton = document.querySelector('.axis');
            axisButton.addEventListener('click', () => {
                changeAxis();
            });

            // hover for ship placement
            //  hover out remove ship placement
            // click, add ship placement
            //  use axis
            //  add function to determine if finished placing
            function checkPlacementClick() {
                redrawPlacementBoard();
                checkPlacement();
            }

            // get the blocks of the board
            // add event listeners
            const blocks = placeShipsOverlay.querySelectorAll('.block');

            // for clicking
            blocks.forEach((block) => {
                block.addEventListener('click', (event) => {
                    // place ship at the current coordinate
                    const clickedCoordinates = getClickedCoordinates(event);

                    if (playerShips.length !== 0) {
                        const currentShip = playerShips.pop();
                        if (
                            !boards[0].addShip(
                                currentShip,
                                clickedCoordinates,
                                axis
                            )
                        ) {
                            playerShips.push(currentShip);
                        }
                    }
                    checkPlacementClick();
                });
            });
        }

        // function used by the click to decide if all ships are placed
        function checkPlacement() {
            // remove the pop up if all ships placed
            if (playerShips.length === 0 && botShips.length === 0) {
                placeShipsOverlay.style.display = 'none';

                // only start the game when the overlay is gone
                redraw();
                isGameOver();
            } else {
                addPlacementListeners();
            }
        }

        // pop up active at the start
        placeShipsOverlay.style.display = 'flex';

        // place all the ships for the bot
        placeBotShips();

        // display the current board
        redrawPlacementBoard();

        // initiate the placement
        // only end when all ships are placed
        // addPlacementListeners will also activate checkPlacement
        checkPlacement();
    }

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
        } else if (
            typeof value === 'number' &&
            (boardName === 'board1' || boardName === 'place-ships-map')
        ) {
            newBlock.classList.add('green');
        } else {
            newBlock.classList.add('white');
            // separate class created to add hover effect
            if (boardName === 'board2') newBlock.classList.add('hover-block');
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

    /* Loop through the two boards
    for each of them, do a double for loop 10 by 10
    get the value at each coordinate of the board, if its
    'M', mark it as dark grey
    'H', red
    '' or numbers, white
    when hover, turn to whitish grey
    */
    function redraw() {
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
        return false;
    }

    // Function to check for a winner and end the game
    function isGameOver() {
        const winner = checkWinner();
        if (winner) {
            // Display the winner
            if (winner === 'bot') {
                alert('you lose');
            } else {
                alert('YOU WIN!!!');
            }
            clearBoards();
            startGame();
        } else {
            // Continue the game by switching turns
            addClickEventListenersForBoard();
        }
    }

    function startGame() {
        placeShips();
    }

    function clearBoards() {
        boards.forEach((board) => {
            board.clearBoard();
        });
    }

    return {
        startGame
    };
}
