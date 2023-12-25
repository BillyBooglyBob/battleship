export default function gameboard() {
    const board = Array.from({ length: 10 }, () => Array(10).fill(''));
    const ships = [];

    /* add ship to the specified coordinate in the direction of the axis
     */
    function addShip(ship, coordinate, direction) {
        ships.push(ship);
        // have index of the ship be its unique identifier to know which
        // ship to apply hit() to
        const coordinateSymbol = ships.length - 1;
        const startX = coordinate[0];
        const startY = coordinate[1];

        // Check the ship fits on the board
        if (
            (direction === 'x' && startY + ship.getLength() - 1 > 9) ||
            (direction === 'y' && startX + ship.getLength() - 1 > 9)
        ) {
            return;
        }

        // Add ship to the board
        for (let i = 0; i < ship.getLength(); i += 1) {
            if (direction === 'x') {
                board[startX][startY + i] = coordinateSymbol;
            } else {
                board[startX - i][startY] = coordinateSymbol;
            }
        }
    }

    /* Given the specified coordinate, try to attack that position
    If its a number, go to the ships[index] and hit()
    else if its '' mark it as miss 'M'
    else if its 'H' skip */
    function receiveAttack(coordinate) {
        const x = coordinate[0];
        const y = coordinate[1];
        const attackCoord = board[x][y];

        if (typeof attackCoord === 'number') {
            ships[attackCoord].hit();
            board[x][y] = 'H';
        } else if (attackCoord === '') {
            board[x][y] = 'M';
        }
    }

    function isAllSunken() {
        return ships.every((ship) => ship.isSunken());
    }

    function getBoard() {
        return board;
    }

    return {
        addShip,
        receiveAttack,
        isAllSunken,
        getBoard
    };
}
