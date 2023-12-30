import randomCoord from './random-coord';

export default function player(playerType) {
    const type = playerType;
    // coordinates already played, used by the bot
    const randomCoord1 = randomCoord();

    function botRandomCoord() {
        const coord = randomCoord1.getRandomCoord();
        return coord;
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
