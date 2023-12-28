import player from '../modules/player';
import gameboard from '../modules/gameboard';
import ship from '../modules/ship';

// jest.mock('../modules/gameboard');

let battleship1;
let battleship2;
let gameboard1;
let player1;
let receiveAttackSpy;

beforeEach(() => {
    battleship1 = new ship(5);
    battleship2 = new ship(2);
    gameboard1 = new gameboard();

    gameboard1.addShip(battleship1, [0, 0], 'x');
    gameboard1.addShip(battleship2, [2, 2], 'x');

    receiveAttackSpy = jest.spyOn(gameboard1, 'receiveAttack');
});

test('manual mode, board calls receiveAttack', () => {
    player1 = new player();
    player1.attack(gameboard1, [0, 0]);

    expect(receiveAttackSpy).toHaveBeenCalledTimes(1);
});

test('bot mode, randomly generated coordinate the board call receiveAttack', () => {
    player1 = new player('bot');
    player1.attack(gameboard1);

    expect(receiveAttackSpy).toHaveBeenCalledTimes(1);
});

/* make the player receive the coordinate from outside source
don't do any event listener enable or disable inside player,
outside its responsibility
*/
