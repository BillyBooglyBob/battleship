export default function player(playerType) {
    const type = playerType;
    // coordinates already played, used by the bot
    const playedCoord = [];

    function isCoordinateDuplicate(coord) {
        return playedCoord.some(
            (prevCoord) =>
                prevCoord[0] === coord[0] && prevCoord[1] === coord[1]
        );
    }

    function getRandomCoord() {
        const min = 0;
        const max = 9;
        let x;
        let y;

        let coordinate;

        do {
            x = Math.floor(Math.random() * (max - min + 1)) + min;
            y = Math.floor(Math.random() * (max - min + 1)) + min;
            coordinate = [x, y];
        } while (isCoordinateDuplicate(coordinate));

        return [x, y];
    }

    function botRandomCoord() {
        const randomCoord = getRandomCoord();

        playedCoord.push(randomCoord);
        return randomCoord;
    }

    function attack(gameboard, coordinate = null) {
        let attackCoord = coordinate;
        if (type === 'bot') attackCoord = botRandomCoord();

        gameboard.receiveAttack(attackCoord);
    }

    return {
        attack
    };
}
