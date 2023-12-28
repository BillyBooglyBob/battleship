import player from '../modules/player';
import gameboard from '../modules/gameboard';
import ship from '../modules/ship';
import game from '../modules/game';

let battleship1;
let battleship2;
let gameboard1;
let gameboard2;
let player1;
let player2;
let game1;

beforeEach(() => {
    battleship1 = new ship(5);
    battleship2 = new ship(2);
    gameboard1 = new gameboard();
    gameboard2 = new gameboard();
    player1 = new player();
    player2 = new player('bot');
    game1 = new game();

    gameboard1.addShip(battleship1, [0, 0], 'x');
    gameboard1.addShip(battleship2, [2, 2], 'x');

    const spyGame = jest.spyOn(game1, 'constructor');
    const spyBoard1 = jest.spyOn(gameboard1, 'constructor');
    const spyBoard2 = jest.spyOn(gameboard2, 'constructor');
    const spyPlayer1 = jest.spyOn(player1, 'constructor');
    const spyPlayer2 = jest.spyOn(player2, 'constructor');
});

test('places the ships - game.placeShips() calls board.addShip()', () => {
    game1.placeShips();

    expect(spyGame.mock.instances[0].placeBotShips).toHaveBeenCalled();
});
test('redraw board - calls board.getBoard() twice', () => {
    game1.redraw();

    expect(spyBoard1.mock.instances[0].getBoard).toHaveBeenCalled();
    expect(spyBoard2.mock.instances[0].getBoard).toHaveBeenCalled();
});
test('check winner - calls isSunken() on both the boards', () => {
    game1.checkWinner();

    expect(spyBoard1.mock.instances[0].isAllSunken).toHaveBeenCalled();
    expect(spyBoard2.mock.instances[0].isAllSunken).toHaveBeenCalled();
});

/* Test all the individual functions instead of integration test

*/
