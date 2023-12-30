export default function randomCoord() {
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

        const coord = [x, y];
        playedCoord.push(coord);
        return coord;
    }

    return {
        getRandomCoord
    };
}
