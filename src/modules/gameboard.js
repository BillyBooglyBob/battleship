export default function gameboard() {
    let board = Array.from({ length: 10 }, () => Array(10).fill(''));
    const ships = [];

    function anotherShipAtLocation(coordVal) {
        if (typeof coordVal === 'number') {
            return true;
        }
        return false;
    }

    /* add ship to the specified coordinate in the direction of the axis
     */
    function addShip(ship, coordinate, direction) {
        // need to check if there are other ships at that coord
        // if so, return flase and the ship
        // only push when you are sure you can place the ship

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
            return false;
        }

        // check if other ships exist at the planned locations
        for (let i = 0; i < ship.getLength(); i += 1) {
            if (direction === 'x') {
                const coord = board[startX][startY + i];
                if (anotherShipAtLocation(coord)) {
                    ships.pop();
                    return false;
                }
            } else {
                const coord = board[startX - i][startY];
                if (anotherShipAtLocation(coord)) {
                    ships.pop();
                    return false;
                }
            }
        }

        // Add ship to the board
        for (let i = 0; i < ship.getLength(); i += 1) {
            if (direction === 'x') {
                board[startX][startY + i] = coordinateSymbol;
            } else {
                board[startX - i][startY] = coordinateSymbol;
            }
        }

        return true;
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

    function clearBoard() {
        board = Array.from({ length: 10 }, () => Array(10).fill(''));
    }

    return {
        addShip,
        receiveAttack,
        isAllSunken,
        getBoard,
        clearBoard
    };
}
