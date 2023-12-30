import gameboard from '../modules/gameboard';
import ship from '../modules/ship';

let battleship1;
let battleship2;
let battleship3;
let gameboard1;

beforeEach(() => {
    battleship1 = new ship(3);
    battleship2 = new ship(5);
    battleship3 = new ship(2);
    gameboard1 = new gameboard();
});

test('cannot place ships in already used coordinates', () => {
    // battleship1 takes up 3 spaces horizontally
    // from 0,0 to 0, 2
    // so battleship2 cannot be placed there
    gameboard1.addShip(battleship1, [0, 0], 'x');
    expect(gameboard1.addShip(battleship2, [0, 1], 'x')).toBeFalsy();

    expect(gameboard1.getBoard()[0][2]).toBe(0);
});

test('check ship is placed and able to be attacked', () => {
    gameboard1.addShip(battleship1, [0, 2], 'x');
    gameboard1.addShip(battleship2, [4, 6], 'y');
    gameboard1.receiveAttack([4, 6]);
    gameboard1.receiveAttack([3, 6]);

    expect(gameboard1.getBoard()[4][6]).toBe('H');
    expect(gameboard1.getBoard()[3][6]).toBe('H');
});

test('check all ships are sunk', () => {
    gameboard1.addShip(battleship3, [0, 0], 'x');
    gameboard1.receiveAttack([0, 0]);
    gameboard1.receiveAttack([0, 1]);

    expect(gameboard1.isAllSunken()).toBeTruthy();
});
