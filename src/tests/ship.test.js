import ship from '../modules/ship';

let battleship;

beforeEach(() => {
    battleship = new ship(3);
});

test('not sunken by default', () => {
    expect(battleship.isSunken()).toBeFalsy();
});

test('not sunken after one hit', () => {
    battleship.hit();
    expect(battleship.isSunken()).toBeFalsy();
});

test('is sunken after 3 hits', () => {
    battleship.hit();
    battleship.hit();
    battleship.hit();
    expect(battleship.isSunken()).toBeTruthy();
});
