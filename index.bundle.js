"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_normalise_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/normalise.css */ "./src/css/normalise.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");




// main loop
const game1 = new _modules_game__WEBPACK_IMPORTED_MODULE_2__["default"]();
game1.startGame();

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _random_coord__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./random-coord */ "./src/modules/random-coord.js");




function game() {
  // players, respective boards
  const players = [new _player__WEBPACK_IMPORTED_MODULE_0__["default"](), new _player__WEBPACK_IMPORTED_MODULE_0__["default"]('bot')];
  const boards = [new _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"](), new _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]()];

  // const board1 = boards[0];
  // const board2 = boards[1];
  // const battleship1 = new ship(3);
  // const battleship2 = new ship(3);
  // board1.addShip(battleship1, [0, 0], 'x');
  // board2.addShip(battleship2, [2, 2], 'x');
  // console.log(boards[0].getBoard());

  function placeShips() {
    const playerShips = [new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](2), new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](3), new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](3), new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](4), new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](5)];
    const botShips = [new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](2), new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](3), new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](3), new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](4), new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](5)];

    // current ship placement axis
    let axis = 'x';

    // current ship placement board
    const placeShipsOverlay = document.querySelector('.place-ship-container');
    function redrawPlacementBoard() {
      redrawBoard(boards[0].getBoard(), 'place-ships-map');
    }

    // randomly place all the bot ships
    // get random coord (from player)
    // try place ship at coord (from board)
    // while ships.length !== 0, continue the above
    function placeBotShips() {
      const randomCoord1 = (0,_random_coord__WEBPACK_IMPORTED_MODULE_3__["default"])();
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
      blocks.forEach(block => {
        block.addEventListener('click', event => {
          // place ship at the current coordinate
          const clickedCoordinates = getClickedCoordinates(event);
          if (playerShips.length !== 0) {
            const currentShip = playerShips.pop();
            if (!boards[0].addShip(currentShip, clickedCoordinates, axis)) {
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
    } else if (typeof value === 'number' && (boardName === 'board1' || boardName === 'place-ships-map')) {
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
  const clickHandler = event => {
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
    blocks.forEach(block => {
      block.addEventListener('click', clickHandler);
    });
  }
  function removeClickEventListenersForBoard() {
    const boardElement = document.querySelector('#board2');

    // Remove click event listeners from each block in the board
    const blocks = boardElement.querySelectorAll('.block');
    blocks.forEach(block => {
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
    boards.forEach(board => {
      board.clearBoard();
    });
  }
  return {
    startGame
  };
}

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameboard)
/* harmony export */ });
function gameboard() {
  let board = Array.from({
    length: 10
  }, () => Array(10).fill(''));
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
    if (direction === 'x' && startY + ship.getLength() - 1 > 9 || direction === 'y' && startX + ship.getLength() - 1 > 9) {
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
    return ships.every(ship => ship.isSunken());
  }
  function getBoard() {
    return board;
  }
  function clearBoard() {
    board = Array.from({
      length: 10
    }, () => Array(10).fill(''));
  }
  return {
    addShip,
    receiveAttack,
    isAllSunken,
    getBoard,
    clearBoard
  };
}

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _random_coord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random-coord */ "./src/modules/random-coord.js");

function player(playerType) {
  const type = playerType;
  // coordinates already played, used by the bot
  const randomCoord1 = (0,_random_coord__WEBPACK_IMPORTED_MODULE_0__["default"])();
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

/***/ }),

/***/ "./src/modules/random-coord.js":
/*!*************************************!*\
  !*** ./src/modules/random-coord.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ randomCoord)
/* harmony export */ });
function randomCoord() {
  const playedCoord = [];
  function isCoordinateDuplicate(coord) {
    return playedCoord.some(prevCoord => prevCoord[0] === coord[0] && prevCoord[1] === coord[1]);
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

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ship)
/* harmony export */ });
function ship(length) {
  let hits = 0;
  function hit() {
    hits++;
  }
  function isSunken() {
    return hits === length;
  }
  function getLength() {
    return length;
  }
  return {
    hit,
    getLength,
    isSunken
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/normalise.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/normalise.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* CSS Reset */

/* Apply a simple reset to remove default browser styling */
body,
h1,
h2,
h3,
p,
ul,
ol,
li,
dl,
dt,
dd,
blockquote,
figure,
figcaption,
div {
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.6;
}

ol,
ul {
  list-style: none;
}

/* Remove default margins on paragraphs */
p {
  margin-bottom: 1rem;
}

/* Remove default styling for anchor links */
a {
  color: inherit;
  text-decoration: none;
}

/* Remove underlines from links */
a:hover {
  text-decoration: none;
}

/* Set box-sizing to border-box for all elements */
*,
*::before,
*::after {
  box-sizing: border-box;
}
`, "",{"version":3,"sources":["webpack://./src/css/normalise.css"],"names":[],"mappings":"AAAA,cAAc;;AAEd,2DAA2D;AAC3D;;;;;;;;;;;;;;;EAeE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA,yCAAyC;AACzC;EACE,mBAAmB;AACrB;;AAEA,4CAA4C;AAC5C;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA,iCAAiC;AACjC;EACE,qBAAqB;AACvB;;AAEA,kDAAkD;AAClD;;;EAGE,sBAAsB;AACxB","sourcesContent":["/* CSS Reset */\n\n/* Apply a simple reset to remove default browser styling */\nbody,\nh1,\nh2,\nh3,\np,\nul,\nol,\nli,\ndl,\ndt,\ndd,\nblockquote,\nfigure,\nfigcaption,\ndiv {\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  line-height: 1.6;\n}\n\nol,\nul {\n  list-style: none;\n}\n\n/* Remove default margins on paragraphs */\np {\n  margin-bottom: 1rem;\n}\n\n/* Remove default styling for anchor links */\na {\n  color: inherit;\n  text-decoration: none;\n}\n\n/* Remove underlines from links */\na:hover {\n  text-decoration: none;\n}\n\n/* Set box-sizing to border-box for all elements */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/style.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/batmfa__.ttf */ "./src/css/fonts/batmfa__.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/batmfo__.ttf */ "./src/css/fonts/batmfo__.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
    font-family: 'headingFont';
    src:
        url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format('truetype'),
        url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format('truetype');
    font-weight: 600;
    font-style: normal;
}

.main-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgb(239, 223, 204);
}

.header {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-heading {
    font-family: 'headingFont';
    font-size: 40px;
}

.game-container {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
}

.board-container {
    display: flex;
    gap: 20px;
}

.board {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
}

.block {
    width: 30px;
    height: 30px;
    border: 1px solid #000; /* Add borders for visualization */
    margin: 1px;
}

/* .hoverblock {

} */

.hover-block:hover {
    background-color: lightgray;
}

.dark-grey {
    background-color: #444;
}

.red {
    background-color: red;
}

.white {
    background-color: white;
}

.green {
    background-color: greenyellow;
}

.place-ship-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(239, 223, 204, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.place-ship {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 500px;
    background-color: rgb(219, 213, 206);
}

.place-ship-instruction {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    font-size: 30px;
    font-weight: 800;
}

.axis {
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: #908e8e;
    color: white;
    font-size: 15px;
    font-weight: 600;
}

.axis:hover {
    background-color: #787777;
}
`, "",{"version":3,"sources":["webpack://./src/css/style.css"],"names":[],"mappings":"AAAA;IACI,0BAA0B;IAC1B;;kEAEkD;IAClD,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,oCAAoC;AACxC;;AAEA;IACI,OAAO;IACP,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,0BAA0B;IAC1B,eAAe;AACnB;;AAEA;IACI,OAAO;IACP,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,SAAS;AACb;;AAEA;IACI,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,sBAAsB,EAAE,kCAAkC;IAC1D,WAAW;AACf;;AAEA;;GAEG;;AAEH;IACI,2BAA2B;AAC/B;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,eAAe;IACf,WAAW;IACX,YAAY;IACZ,yCAAyC;IACzC,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,SAAS;IACT,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,oCAAoC;AACxC;;AAEA;IACI;kBACc;IACd,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,YAAY;IACZ,mBAAmB;IACnB,yBAAyB;IACzB,YAAY;IACZ,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,yBAAyB;AAC7B","sourcesContent":["@font-face {\n    font-family: 'headingFont';\n    src:\n        url('./fonts/batmfa__.ttf') format('truetype'),\n        url('./fonts/batmfo__.ttf') format('truetype');\n    font-weight: 600;\n    font-style: normal;\n}\n\n.main-container {\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    background-color: rgb(239, 223, 204);\n}\n\n.header {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.header-heading {\n    font-family: 'headingFont';\n    font-size: 40px;\n}\n\n.game-container {\n    flex: 4;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.board-container {\n    display: flex;\n    gap: 20px;\n}\n\n.board {\n    display: flex;\n    flex-direction: column;\n}\n\n.row {\n    display: flex;\n}\n\n.block {\n    width: 30px;\n    height: 30px;\n    border: 1px solid #000; /* Add borders for visualization */\n    margin: 1px;\n}\n\n/* .hoverblock {\n\n} */\n\n.hover-block:hover {\n    background-color: lightgray;\n}\n\n.dark-grey {\n    background-color: #444;\n}\n\n.red {\n    background-color: red;\n}\n\n.white {\n    background-color: white;\n}\n\n.green {\n    background-color: greenyellow;\n}\n\n.place-ship-container {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background-color: rgb(239, 223, 204, 0.5);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.place-ship {\n    display: flex;\n    gap: 10px;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 350px;\n    height: 500px;\n    background-color: rgb(219, 213, 206);\n}\n\n.place-ship-instruction {\n    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',\n        sans-serif;\n    font-size: 30px;\n    font-weight: 800;\n}\n\n.axis {\n    width: 100px;\n    height: 40px;\n    border: none;\n    border-radius: 10px;\n    background-color: #908e8e;\n    color: white;\n    font-size: 15px;\n    font-weight: 600;\n}\n\n.axis:hover {\n    background-color: #787777;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/normalise.css":
/*!*******************************!*\
  !*** ./src/css/normalise.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_normalise_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./normalise.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/normalise.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_normalise_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_normalise_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_normalise_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_normalise_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/css/fonts/batmfa__.ttf":
/*!************************************!*\
  !*** ./src/css/fonts/batmfa__.ttf ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "83168830dd1fb811c114.ttf";

/***/ }),

/***/ "./src/css/fonts/batmfo__.ttf":
/*!************************************!*\
  !*** ./src/css/fonts/batmfo__.ttf ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "df7ac9e708b4865e7ee7.ttf";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9yYW5kb20tY29vcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvY3NzL25vcm1hbGlzZS5jc3MiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2Nzcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9jc3Mvbm9ybWFsaXNlLmNzcz8wYjRhIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9jc3Mvc3R5bGUuY3NzPzlmY2QiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vY3NzL25vcm1hbGlzZS5jc3MnO1xuaW1wb3J0ICcuL2Nzcy9zdHlsZS5jc3MnO1xuaW1wb3J0IGdhbWUgZnJvbSAnLi9tb2R1bGVzL2dhbWUnO1xuXG4vLyBtYWluIGxvb3BcbmNvbnN0IGdhbWUxID0gbmV3IGdhbWUoKTtcblxuZ2FtZTEuc3RhcnRHYW1lKCk7XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHNoaXAgZnJvbSAnLi9zaGlwJztcbmltcG9ydCByYW5kb21Db29yZCBmcm9tICcuL3JhbmRvbS1jb29yZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWUoKSB7XG4gICAgLy8gcGxheWVycywgcmVzcGVjdGl2ZSBib2FyZHNcbiAgICBjb25zdCBwbGF5ZXJzID0gW25ldyBwbGF5ZXIoKSwgbmV3IHBsYXllcignYm90JyldO1xuICAgIGNvbnN0IGJvYXJkcyA9IFtuZXcgZ2FtZWJvYXJkKCksIG5ldyBnYW1lYm9hcmQoKV07XG5cbiAgICAvLyBjb25zdCBib2FyZDEgPSBib2FyZHNbMF07XG4gICAgLy8gY29uc3QgYm9hcmQyID0gYm9hcmRzWzFdO1xuICAgIC8vIGNvbnN0IGJhdHRsZXNoaXAxID0gbmV3IHNoaXAoMyk7XG4gICAgLy8gY29uc3QgYmF0dGxlc2hpcDIgPSBuZXcgc2hpcCgzKTtcbiAgICAvLyBib2FyZDEuYWRkU2hpcChiYXR0bGVzaGlwMSwgWzAsIDBdLCAneCcpO1xuICAgIC8vIGJvYXJkMi5hZGRTaGlwKGJhdHRsZXNoaXAyLCBbMiwgMl0sICd4Jyk7XG4gICAgLy8gY29uc29sZS5sb2coYm9hcmRzWzBdLmdldEJvYXJkKCkpO1xuXG4gICAgZnVuY3Rpb24gcGxhY2VTaGlwcygpIHtcbiAgICAgICAgY29uc3QgcGxheWVyU2hpcHMgPSBbXG4gICAgICAgICAgICBuZXcgc2hpcCgyKSxcbiAgICAgICAgICAgIG5ldyBzaGlwKDMpLFxuICAgICAgICAgICAgbmV3IHNoaXAoMyksXG4gICAgICAgICAgICBuZXcgc2hpcCg0KSxcbiAgICAgICAgICAgIG5ldyBzaGlwKDUpXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgYm90U2hpcHMgPSBbXG4gICAgICAgICAgICBuZXcgc2hpcCgyKSxcbiAgICAgICAgICAgIG5ldyBzaGlwKDMpLFxuICAgICAgICAgICAgbmV3IHNoaXAoMyksXG4gICAgICAgICAgICBuZXcgc2hpcCg0KSxcbiAgICAgICAgICAgIG5ldyBzaGlwKDUpXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gY3VycmVudCBzaGlwIHBsYWNlbWVudCBheGlzXG4gICAgICAgIGxldCBheGlzID0gJ3gnO1xuXG4gICAgICAgIC8vIGN1cnJlbnQgc2hpcCBwbGFjZW1lbnQgYm9hcmRcbiAgICAgICAgY29uc3QgcGxhY2VTaGlwc092ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy5wbGFjZS1zaGlwLWNvbnRhaW5lcidcbiAgICAgICAgKTtcblxuICAgICAgICBmdW5jdGlvbiByZWRyYXdQbGFjZW1lbnRCb2FyZCgpIHtcbiAgICAgICAgICAgIHJlZHJhd0JvYXJkKGJvYXJkc1swXS5nZXRCb2FyZCgpLCAncGxhY2Utc2hpcHMtbWFwJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByYW5kb21seSBwbGFjZSBhbGwgdGhlIGJvdCBzaGlwc1xuICAgICAgICAvLyBnZXQgcmFuZG9tIGNvb3JkIChmcm9tIHBsYXllcilcbiAgICAgICAgLy8gdHJ5IHBsYWNlIHNoaXAgYXQgY29vcmQgKGZyb20gYm9hcmQpXG4gICAgICAgIC8vIHdoaWxlIHNoaXBzLmxlbmd0aCAhPT0gMCwgY29udGludWUgdGhlIGFib3ZlXG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlQm90U2hpcHMoKSB7XG4gICAgICAgICAgICBjb25zdCByYW5kb21Db29yZDEgPSByYW5kb21Db29yZCgpO1xuICAgICAgICAgICAgd2hpbGUgKGJvdFNoaXBzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gYm90U2hpcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmQgPSByYW5kb21Db29yZDEuZ2V0UmFuZG9tQ29vcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWJvYXJkc1sxXS5hZGRTaGlwKGN1cnJlbnRTaGlwLCBjb29yZCwgYXhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgYm90U2hpcHMucHVzaChjdXJyZW50U2hpcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkUGxhY2VtZW50TGlzdGVuZXJzKCkge1xuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgLy8gYnV0dG9uIHRvIGNoYW5nZSB0aGUgYXhpc1xuICAgICAgICAgICAgZnVuY3Rpb24gY2hhbmdlQXhpcygpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGF4aXMgPSAneSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXhpcyA9ICd4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGF4aXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXhpcycpO1xuICAgICAgICAgICAgYXhpc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VBeGlzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gaG92ZXIgZm9yIHNoaXAgcGxhY2VtZW50XG4gICAgICAgICAgICAvLyAgaG92ZXIgb3V0IHJlbW92ZSBzaGlwIHBsYWNlbWVudFxuICAgICAgICAgICAgLy8gY2xpY2ssIGFkZCBzaGlwIHBsYWNlbWVudFxuICAgICAgICAgICAgLy8gIHVzZSBheGlzXG4gICAgICAgICAgICAvLyAgYWRkIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiBmaW5pc2hlZCBwbGFjaW5nXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1BsYWNlbWVudENsaWNrKCkge1xuICAgICAgICAgICAgICAgIHJlZHJhd1BsYWNlbWVudEJvYXJkKCk7XG4gICAgICAgICAgICAgICAgY2hlY2tQbGFjZW1lbnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBibG9ja3Mgb2YgdGhlIGJvYXJkXG4gICAgICAgICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAgICBjb25zdCBibG9ja3MgPSBwbGFjZVNoaXBzT3ZlcmxheS5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvY2snKTtcblxuICAgICAgICAgICAgLy8gZm9yIGNsaWNraW5nXG4gICAgICAgICAgICBibG9ja3MuZm9yRWFjaCgoYmxvY2spID0+IHtcbiAgICAgICAgICAgICAgICBibG9jay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBwbGFjZSBzaGlwIGF0IHRoZSBjdXJyZW50IGNvb3JkaW5hdGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xpY2tlZENvb3JkaW5hdGVzID0gZ2V0Q2xpY2tlZENvb3JkaW5hdGVzKGV2ZW50KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyU2hpcHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFib2FyZHNbMF0uYWRkU2hpcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNoaXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrZWRDb29yZGluYXRlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllclNoaXBzLnB1c2goY3VycmVudFNoaXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrUGxhY2VtZW50Q2xpY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gdXNlZCBieSB0aGUgY2xpY2sgdG8gZGVjaWRlIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUGxhY2VtZW50KCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBwb3AgdXAgaWYgYWxsIHNoaXBzIHBsYWNlZFxuICAgICAgICAgICAgaWYgKHBsYXllclNoaXBzLmxlbmd0aCA9PT0gMCAmJiBib3RTaGlwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNoaXBzT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBzdGFydCB0aGUgZ2FtZSB3aGVuIHRoZSBvdmVybGF5IGlzIGdvbmVcbiAgICAgICAgICAgICAgICByZWRyYXcoKTtcbiAgICAgICAgICAgICAgICBpc0dhbWVPdmVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZFBsYWNlbWVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcG9wIHVwIGFjdGl2ZSBhdCB0aGUgc3RhcnRcbiAgICAgICAgcGxhY2VTaGlwc092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcblxuICAgICAgICAvLyBwbGFjZSBhbGwgdGhlIHNoaXBzIGZvciB0aGUgYm90XG4gICAgICAgIHBsYWNlQm90U2hpcHMoKTtcblxuICAgICAgICAvLyBkaXNwbGF5IHRoZSBjdXJyZW50IGJvYXJkXG4gICAgICAgIHJlZHJhd1BsYWNlbWVudEJvYXJkKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgdGhlIHBsYWNlbWVudFxuICAgICAgICAvLyBvbmx5IGVuZCB3aGVuIGFsbCBzaGlwcyBhcmUgcGxhY2VkXG4gICAgICAgIC8vIGFkZFBsYWNlbWVudExpc3RlbmVycyB3aWxsIGFsc28gYWN0aXZhdGUgY2hlY2tQbGFjZW1lbnRcbiAgICAgICAgY2hlY2tQbGFjZW1lbnQoKTtcbiAgICB9XG5cbiAgICAvLyBjb2xvdXIgdGhlIGJsb2NrcyBvbiB0aGUgYm9hcmRzIGFuZCBhZGQgaG92ZXIgZWZmZWN0IGRlcGVuZGluZyBvblxuICAgIC8vIHdoaWNoIHBsYXllciBpdCBiZWxvbmdzIHRvIGFuZCB0aGUgdmFsdWUgb2YgdGhlIGNvb3JkXG4gICAgZnVuY3Rpb24gY3JlYXRlQmxvY2sodmFsdWUsIGJvYXJkTmFtZSwgY29vcmQpIHtcbiAgICAgICAgY29uc3QgbmV3QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAvLyBTZXQgdGhlIGNsYXNzIGJhc2VkIG9uIHRoZSB2YWx1ZSBhdCB0aGUgY29vcmRpbmF0ZVxuICAgICAgICBuZXdCbG9jay5jbGFzc05hbWUgPSAnYmxvY2snO1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBjb29yZDtcbiAgICAgICAgbmV3QmxvY2suZGF0YXNldC54ID0geDtcbiAgICAgICAgbmV3QmxvY2suZGF0YXNldC55ID0geTtcblxuICAgICAgICAvLyBtb2RpZnkgdGhlIGNvbG91ciB0aHJvdWdoIGNsYXNzLCBhcyBkaXJlY3RseSBtb2RpZnlpbmcgdGhlIGNvbG91clxuICAgICAgICAvLyB3aWxsIGFsc28gb3ZlcnJpZGUgdGhlIGNvbG9yIG9mIHRoZSBob3ZlciBzdGF0ZVxuXG4gICAgICAgIC8vIE0sIGJvdGgsIGRhcmsgZ3JleVxuICAgICAgICAvLyBILCBib3RoLCByZWRcbiAgICAgICAgLy8gc2hpcHMgKG51bWJlcnMpLCBtZSwgZ3JlZW5cbiAgICAgICAgLy8gJycsIGJvdGgsIHdoaXRlXG4gICAgICAgIC8vIGhvdmVyLCBlbmVteSwgd2hpdGVcbiAgICAgICAgaWYgKHZhbHVlID09PSAnTScpIHtcbiAgICAgICAgICAgIG5ld0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ2RhcmstZ3JleScpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnSCcpIHtcbiAgICAgICAgICAgIG5ld0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ3JlZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgKGJvYXJkTmFtZSA9PT0gJ2JvYXJkMScgfHwgYm9hcmROYW1lID09PSAncGxhY2Utc2hpcHMtbWFwJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBuZXdCbG9jay5jbGFzc0xpc3QuYWRkKCdncmVlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3QmxvY2suY2xhc3NMaXN0LmFkZCgnd2hpdGUnKTtcbiAgICAgICAgICAgIC8vIHNlcGFyYXRlIGNsYXNzIGNyZWF0ZWQgdG8gYWRkIGhvdmVyIGVmZmVjdFxuICAgICAgICAgICAgaWYgKGJvYXJkTmFtZSA9PT0gJ2JvYXJkMicpIG5ld0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ2hvdmVyLWJsb2NrJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3QmxvY2s7XG4gICAgfVxuXG4gICAgLy8gcmVkcmF3IGRpZmZlcmVudCBib2FyZHNcbiAgICBmdW5jdGlvbiByZWRyYXdCb2FyZChib2FyZCwgYm9hcmROYW1lKSB7XG4gICAgICAgIC8vIGdldCB0aGUgYm9hcmQgdG8gbW9kaWZ5XG4gICAgICAgIGNvbnN0IGJvYXJkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkTmFtZX1gKTtcbiAgICAgICAgLy8gcmVtb3ZlIHByZXZpb3VzIGJvYXJkIGJlZm9yZSBkcmF3aW5nIHRoZSBuZXcgb25lXG4gICAgICAgIGJvYXJkRWxlbWVudC5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbmV3Um93LmNsYXNzTmFtZSA9ICdyb3cnOyAvLyBBZGQgYSBjbGFzcyB0byB0aGUgcm93XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGJvYXJkW2ldW2pdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0Jsb2NrID0gY3JlYXRlQmxvY2sodmFsdWUsIGJvYXJkTmFtZSwgW2ksIGpdKTtcbiAgICAgICAgICAgICAgICBuZXdSb3cuYXBwZW5kQ2hpbGQobmV3QmxvY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9hcmRFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Jvdyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBMb29wIHRocm91Z2ggdGhlIHR3byBib2FyZHNcbiAgICBmb3IgZWFjaCBvZiB0aGVtLCBkbyBhIGRvdWJsZSBmb3IgbG9vcCAxMCBieSAxMFxuICAgIGdldCB0aGUgdmFsdWUgYXQgZWFjaCBjb29yZGluYXRlIG9mIHRoZSBib2FyZCwgaWYgaXRzXG4gICAgJ00nLCBtYXJrIGl0IGFzIGRhcmsgZ3JleVxuICAgICdIJywgcmVkXG4gICAgJycgb3IgbnVtYmVycywgd2hpdGVcbiAgICB3aGVuIGhvdmVyLCB0dXJuIHRvIHdoaXRpc2ggZ3JleVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVkcmF3KCkge1xuICAgICAgICByZWRyYXdCb2FyZChib2FyZHNbMF0uZ2V0Qm9hcmQoKSwgJ2JvYXJkMScpO1xuICAgICAgICByZWRyYXdCb2FyZChib2FyZHNbMV0uZ2V0Qm9hcmQoKSwgJ2JvYXJkMicpO1xuICAgIH1cblxuICAgIC8qIEdldCB0aGUgY29vcmRpbmF0ZSBvZiB0aGUgYmxvY2sgY2xpY2tlZCAqL1xuICAgIGZ1bmN0aW9uIGdldENsaWNrZWRDb29yZGluYXRlcyhldmVudCkge1xuICAgICAgICBjb25zdCBjbGlja2VkQmxvY2sgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHggPSBwYXJzZUludChjbGlja2VkQmxvY2suZGF0YXNldC54LCAxMCk7XG4gICAgICAgIGNvbnN0IHkgPSBwYXJzZUludChjbGlja2VkQmxvY2suZGF0YXNldC55LCAxMCk7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBjb29yZGluYXRlcyBhcyBhbiBhcnJheVxuICAgICAgICByZXR1cm4gW3gsIHldO1xuICAgIH1cblxuICAgIC8qIEF0dGFjayB0aGUgZW5lbXkgYm9hcmQgdXNpbmcgdGhlIGNvb3JkaWFudGVcbiAgICBzd2l0Y2ggdHVybiBhZnRlciBhdHRhY2tpbmcgKi9cbiAgICBjb25zdCBjbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2xpY2tlZENvb3JkaW5hdGVzID0gZ2V0Q2xpY2tlZENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICAgICAgLy8gUGVyZm9ybSB0aGUgYXR0YWNrIGZvciB0aGUgY3VycmVudCBwbGF5ZXJcbiAgICAgICAgcGxheWVyc1swXS5hdHRhY2soYm9hcmRzWzFdLCBjbGlja2VkQ29vcmRpbmF0ZXMpO1xuICAgICAgICBwbGF5ZXJzWzFdLmF0dGFjayhib2FyZHNbMF0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSBjbGljayBldmVudCBsaXN0ZW5lcnMgYmVmb3JlIHJlZHJhd2luZ1xuICAgICAgICByZW1vdmVDbGlja0V2ZW50TGlzdGVuZXJzRm9yQm9hcmQoKTtcblxuICAgICAgICByZWRyYXcoKTtcbiAgICAgICAgaXNHYW1lT3ZlcigpO1xuICAgIH07XG5cbiAgICAvKiBBZGQgdGhlIGF0dGFjayBldmVudCB0byB0aGUgYmxvY2tzICovXG4gICAgZnVuY3Rpb24gYWRkQ2xpY2tFdmVudExpc3RlbmVyc0ZvckJvYXJkKCkge1xuICAgICAgICBjb25zdCBib2FyZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYm9hcmQyJyk7XG5cbiAgICAgICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVycyB0byBlYWNoIGJsb2NrIGluIHRoZSBib2FyZFxuICAgICAgICBjb25zdCBibG9ja3MgPSBib2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJsb2NrJyk7XG4gICAgICAgIGJsb2Nrcy5mb3JFYWNoKChibG9jaykgPT4ge1xuICAgICAgICAgICAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVDbGlja0V2ZW50TGlzdGVuZXJzRm9yQm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IGJvYXJkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib2FyZDInKTtcblxuICAgICAgICAvLyBSZW1vdmUgY2xpY2sgZXZlbnQgbGlzdGVuZXJzIGZyb20gZWFjaCBibG9jayBpbiB0aGUgYm9hcmRcbiAgICAgICAgY29uc3QgYmxvY2tzID0gYm9hcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jaycpO1xuICAgICAgICBibG9ja3MuZm9yRWFjaCgoYmxvY2spID0+IHtcbiAgICAgICAgICAgIGJsb2NrLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXaW5uZXIoKSB7XG4gICAgICAgIGlmIChib2FyZHNbMF0uaXNBbGxTdW5rZW4oKSkgcmV0dXJuICdib3QnO1xuICAgICAgICBpZiAoYm9hcmRzWzFdLmlzQWxsU3Vua2VuKCkpIHJldHVybiAncGxheWVyJztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEZ1bmN0aW9uIHRvIGNoZWNrIGZvciBhIHdpbm5lciBhbmQgZW5kIHRoZSBnYW1lXG4gICAgZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgICAgICAgY29uc3Qgd2lubmVyID0gY2hlY2tXaW5uZXIoKTtcbiAgICAgICAgaWYgKHdpbm5lcikge1xuICAgICAgICAgICAgLy8gRGlzcGxheSB0aGUgd2lubmVyXG4gICAgICAgICAgICBpZiAod2lubmVyID09PSAnYm90Jykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCd5b3UgbG9zZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnWU9VIFdJTiEhIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYXJCb2FyZHMoKTtcbiAgICAgICAgICAgIHN0YXJ0R2FtZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ29udGludWUgdGhlIGdhbWUgYnkgc3dpdGNoaW5nIHR1cm5zXG4gICAgICAgICAgICBhZGRDbGlja0V2ZW50TGlzdGVuZXJzRm9yQm9hcmQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgcGxhY2VTaGlwcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyQm9hcmRzKCkge1xuICAgICAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgICAgICAgIGJvYXJkLmNsZWFyQm9hcmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnRHYW1lXG4gICAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVib2FyZCgpIHtcbiAgICBsZXQgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoKSA9PiBBcnJheSgxMCkuZmlsbCgnJykpO1xuICAgIGNvbnN0IHNoaXBzID0gW107XG5cbiAgICBmdW5jdGlvbiBhbm90aGVyU2hpcEF0TG9jYXRpb24oY29vcmRWYWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb29yZFZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiBhZGQgc2hpcCB0byB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGUgaW4gdGhlIGRpcmVjdGlvbiBvZiB0aGUgYXhpc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZFNoaXAoc2hpcCwgY29vcmRpbmF0ZSwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gY2hlY2sgaWYgdGhlcmUgYXJlIG90aGVyIHNoaXBzIGF0IHRoYXQgY29vcmRcbiAgICAgICAgLy8gaWYgc28sIHJldHVybiBmbGFzZSBhbmQgdGhlIHNoaXBcbiAgICAgICAgLy8gb25seSBwdXNoIHdoZW4geW91IGFyZSBzdXJlIHlvdSBjYW4gcGxhY2UgdGhlIHNoaXBcblxuICAgICAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICAvLyBoYXZlIGluZGV4IG9mIHRoZSBzaGlwIGJlIGl0cyB1bmlxdWUgaWRlbnRpZmllciB0byBrbm93IHdoaWNoXG4gICAgICAgIC8vIHNoaXAgdG8gYXBwbHkgaGl0KCkgdG9cbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZVN5bWJvbCA9IHNoaXBzLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IHN0YXJ0WCA9IGNvb3JkaW5hdGVbMF07XG4gICAgICAgIGNvbnN0IHN0YXJ0WSA9IGNvb3JkaW5hdGVbMV07XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhlIHNoaXAgZml0cyBvbiB0aGUgYm9hcmRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGRpcmVjdGlvbiA9PT0gJ3gnICYmIHN0YXJ0WSArIHNoaXAuZ2V0TGVuZ3RoKCkgLSAxID4gOSkgfHxcbiAgICAgICAgICAgIChkaXJlY3Rpb24gPT09ICd5JyAmJiBzdGFydFggKyBzaGlwLmdldExlbmd0aCgpIC0gMSA+IDkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgb3RoZXIgc2hpcHMgZXhpc3QgYXQgdGhlIHBsYW5uZWQgbG9jYXRpb25zXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb29yZCA9IGJvYXJkW3N0YXJ0WF1bc3RhcnRZICsgaV07XG4gICAgICAgICAgICAgICAgaWYgKGFub3RoZXJTaGlwQXRMb2NhdGlvbihjb29yZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkID0gYm9hcmRbc3RhcnRYIC0gaV1bc3RhcnRZXTtcbiAgICAgICAgICAgICAgICBpZiAoYW5vdGhlclNoaXBBdExvY2F0aW9uKGNvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBzaGlwcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBzaGlwIHRvIHRoZSBib2FyZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbc3RhcnRYXVtzdGFydFkgKyBpXSA9IGNvb3JkaW5hdGVTeW1ib2w7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvYXJkW3N0YXJ0WCAtIGldW3N0YXJ0WV0gPSBjb29yZGluYXRlU3ltYm9sO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyogR2l2ZW4gdGhlIHNwZWNpZmllZCBjb29yZGluYXRlLCB0cnkgdG8gYXR0YWNrIHRoYXQgcG9zaXRpb25cbiAgICBJZiBpdHMgYSBudW1iZXIsIGdvIHRvIHRoZSBzaGlwc1tpbmRleF0gYW5kIGhpdCgpXG4gICAgZWxzZSBpZiBpdHMgJycgbWFyayBpdCBhcyBtaXNzICdNJ1xuICAgIGVsc2UgaWYgaXRzICdIJyBza2lwICovXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlKSB7XG4gICAgICAgIGNvbnN0IHggPSBjb29yZGluYXRlWzBdO1xuICAgICAgICBjb25zdCB5ID0gY29vcmRpbmF0ZVsxXTtcbiAgICAgICAgY29uc3QgYXR0YWNrQ29vcmQgPSBib2FyZFt4XVt5XTtcblxuICAgICAgICBpZiAodHlwZW9mIGF0dGFja0Nvb3JkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgc2hpcHNbYXR0YWNrQ29vcmRdLmhpdCgpO1xuICAgICAgICAgICAgYm9hcmRbeF1beV0gPSAnSCc7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0YWNrQ29vcmQgPT09ICcnKSB7XG4gICAgICAgICAgICBib2FyZFt4XVt5XSA9ICdNJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQWxsU3Vua2VuKCkge1xuICAgICAgICByZXR1cm4gc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rZW4oKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9hcmQoKSB7XG4gICAgICAgIHJldHVybiBib2FyZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckJvYXJkKCkge1xuICAgICAgICBib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5KDEwKS5maWxsKCcnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgaXNBbGxTdW5rZW4sXG4gICAgICAgIGdldEJvYXJkLFxuICAgICAgICBjbGVhckJvYXJkXG4gICAgfTtcbn1cbiIsImltcG9ydCByYW5kb21Db29yZCBmcm9tICcuL3JhbmRvbS1jb29yZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBsYXllcihwbGF5ZXJUeXBlKSB7XG4gICAgY29uc3QgdHlwZSA9IHBsYXllclR5cGU7XG4gICAgLy8gY29vcmRpbmF0ZXMgYWxyZWFkeSBwbGF5ZWQsIHVzZWQgYnkgdGhlIGJvdFxuICAgIGNvbnN0IHJhbmRvbUNvb3JkMSA9IHJhbmRvbUNvb3JkKCk7XG5cbiAgICBmdW5jdGlvbiBib3RSYW5kb21Db29yZCgpIHtcbiAgICAgICAgY29uc3QgY29vcmQgPSByYW5kb21Db29yZDEuZ2V0UmFuZG9tQ29vcmQoKTtcbiAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF0dGFjayhnYW1lYm9hcmQsIGNvb3JkaW5hdGUgPSBudWxsKSB7XG4gICAgICAgIGxldCBhdHRhY2tDb29yZCA9IGNvb3JkaW5hdGU7XG4gICAgICAgIGlmICh0eXBlID09PSAnYm90JykgYXR0YWNrQ29vcmQgPSBib3RSYW5kb21Db29yZCgpO1xuXG4gICAgICAgIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhdHRhY2tcbiAgICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tQ29vcmQoKSB7XG4gICAgY29uc3QgcGxheWVkQ29vcmQgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGlzQ29vcmRpbmF0ZUR1cGxpY2F0ZShjb29yZCkge1xuICAgICAgICByZXR1cm4gcGxheWVkQ29vcmQuc29tZShcbiAgICAgICAgICAgIChwcmV2Q29vcmQpID0+XG4gICAgICAgICAgICAgICAgcHJldkNvb3JkWzBdID09PSBjb29yZFswXSAmJiBwcmV2Q29vcmRbMV0gPT09IGNvb3JkWzFdXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UmFuZG9tQ29vcmQoKSB7XG4gICAgICAgIGNvbnN0IG1pbiA9IDA7XG4gICAgICAgIGNvbnN0IG1heCA9IDk7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBsZXQgY29vcmRpbmF0ZTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IFt4LCB5XTtcbiAgICAgICAgfSB3aGlsZSAoaXNDb29yZGluYXRlRHVwbGljYXRlKGNvb3JkaW5hdGUpKTtcblxuICAgICAgICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgICAgICAgcGxheWVkQ29vcmQucHVzaChjb29yZCk7XG4gICAgICAgIHJldHVybiBjb29yZDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRSYW5kb21Db29yZFxuICAgIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGlwKGxlbmd0aCkge1xuICAgIGxldCBoaXRzID0gMDtcblxuICAgIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICAgICAgaGl0cysrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU3Vua2VuKCkge1xuICAgICAgICByZXR1cm4gaGl0cyA9PT0gbGVuZ3RoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldExlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoaXQsXG4gICAgICAgIGdldExlbmd0aCxcbiAgICAgICAgaXNTdW5rZW5cbiAgICB9O1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIENTUyBSZXNldCAqL1xuXG4vKiBBcHBseSBhIHNpbXBsZSByZXNldCB0byByZW1vdmUgZGVmYXVsdCBicm93c2VyIHN0eWxpbmcgKi9cbmJvZHksXG5oMSxcbmgyLFxuaDMsXG5wLFxudWwsXG5vbCxcbmxpLFxuZGwsXG5kdCxcbmRkLFxuYmxvY2txdW90ZSxcbmZpZ3VyZSxcbmZpZ2NhcHRpb24sXG5kaXYge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbmJvZHkge1xuICBsaW5lLWhlaWdodDogMS42O1xufVxuXG5vbCxcbnVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLyogUmVtb3ZlIGRlZmF1bHQgbWFyZ2lucyBvbiBwYXJhZ3JhcGhzICovXG5wIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLyogUmVtb3ZlIGRlZmF1bHQgc3R5bGluZyBmb3IgYW5jaG9yIGxpbmtzICovXG5hIHtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLyogUmVtb3ZlIHVuZGVybGluZXMgZnJvbSBsaW5rcyAqL1xuYTpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLyogU2V0IGJveC1zaXppbmcgdG8gYm9yZGVyLWJveCBmb3IgYWxsIGVsZW1lbnRzICovXG4qLFxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzL25vcm1hbGlzZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsY0FBYzs7QUFFZCwyREFBMkQ7QUFDM0Q7Ozs7Ozs7Ozs7Ozs7OztFQWVFLFNBQVM7RUFDVCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7O0VBRUUsZ0JBQWdCO0FBQ2xCOztBQUVBLHlDQUF5QztBQUN6QztFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQSw0Q0FBNEM7QUFDNUM7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUVBLGlDQUFpQztBQUNqQztFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQSxrREFBa0Q7QUFDbEQ7OztFQUdFLHNCQUFzQjtBQUN4QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBDU1MgUmVzZXQgKi9cXG5cXG4vKiBBcHBseSBhIHNpbXBsZSByZXNldCB0byByZW1vdmUgZGVmYXVsdCBicm93c2VyIHN0eWxpbmcgKi9cXG5ib2R5LFxcbmgxLFxcbmgyLFxcbmgzLFxcbnAsXFxudWwsXFxub2wsXFxubGksXFxuZGwsXFxuZHQsXFxuZGQsXFxuYmxvY2txdW90ZSxcXG5maWd1cmUsXFxuZmlnY2FwdGlvbixcXG5kaXYge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMS42O1xcbn1cXG5cXG5vbCxcXG51bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKiBSZW1vdmUgZGVmYXVsdCBtYXJnaW5zIG9uIHBhcmFncmFwaHMgKi9cXG5wIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi8qIFJlbW92ZSBkZWZhdWx0IHN0eWxpbmcgZm9yIGFuY2hvciBsaW5rcyAqL1xcbmEge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcblxcbi8qIFJlbW92ZSB1bmRlcmxpbmVzIGZyb20gbGlua3MgKi9cXG5hOmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxuLyogU2V0IGJveC1zaXppbmcgdG8gYm9yZGVyLWJveCBmb3IgYWxsIGVsZW1lbnRzICovXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL2JhdG1mYV9fLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vZm9udHMvYmF0bWZvX18udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdoZWFkaW5nRm9udCc7XG4gICAgc3JjOlxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSkgZm9ybWF0KCd0cnVldHlwZScpLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSkgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuXG4ubWFpbi1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM5LCAyMjMsIDIwNCk7XG59XG5cbi5oZWFkZXIge1xuICAgIGZsZXg6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uaGVhZGVyLWhlYWRpbmcge1xuICAgIGZvbnQtZmFtaWx5OiAnaGVhZGluZ0ZvbnQnO1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgICBmbGV4OiA0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJvYXJkLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDIwcHg7XG59XG5cbi5ib2FyZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ucm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uYmxvY2sge1xuICAgIHdpZHRoOiAzMHB4O1xuICAgIGhlaWdodDogMzBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwOyAvKiBBZGQgYm9yZGVycyBmb3IgdmlzdWFsaXphdGlvbiAqL1xuICAgIG1hcmdpbjogMXB4O1xufVxuXG4vKiAuaG92ZXJibG9jayB7XG5cbn0gKi9cblxuLmhvdmVyLWJsb2NrOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XG59XG5cbi5kYXJrLWdyZXkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NDQ7XG59XG5cbi5yZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLndoaXRlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLmdyZWVuIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbnllbGxvdztcbn1cblxuLnBsYWNlLXNoaXAtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzksIDIyMywgMjA0LCAwLjUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnBsYWNlLXNoaXAge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiAxMHB4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB3aWR0aDogMzUwcHg7XG4gICAgaGVpZ2h0OiA1MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjE5LCAyMTMsIDIwNik7XG59XG5cbi5wbGFjZS1zaGlwLWluc3RydWN0aW9uIHtcbiAgICBmb250LWZhbWlseTogJ0dpbGwgU2FucycsICdHaWxsIFNhbnMgTVQnLCBDYWxpYnJpLCAnVHJlYnVjaGV0IE1TJyxcbiAgICAgICAgc2Fucy1zZXJpZjtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcbn1cblxuLmF4aXMge1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzkwOGU4ZTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5heGlzOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzg3Nzc3O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLDBCQUEwQjtJQUMxQjs7a0VBRWtEO0lBQ2xELGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksT0FBTztJQUNQLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksMEJBQTBCO0lBQzFCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxPQUFPO0lBQ1AsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsU0FBUztBQUNiOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLHNCQUFzQixFQUFFLGtDQUFrQztJQUMxRCxXQUFXO0FBQ2Y7O0FBRUE7O0dBRUc7O0FBRUg7SUFDSSwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLFlBQVk7SUFDWix5Q0FBeUM7SUFDekMsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsU0FBUztJQUNULHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixhQUFhO0lBQ2Isb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0k7a0JBQ2M7SUFDZCxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdoZWFkaW5nRm9udCc7XFxuICAgIHNyYzpcXG4gICAgICAgIHVybCgnLi9mb250cy9iYXRtZmFfXy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyksXFxuICAgICAgICB1cmwoJy4vZm9udHMvYmF0bWZvX18udHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbi5tYWluLWNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzOSwgMjIzLCAyMDQpO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5oZWFkZXItaGVhZGluZyB7XFxuICAgIGZvbnQtZmFtaWx5OiAnaGVhZGluZ0ZvbnQnO1xcbiAgICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICAgIGZsZXg6IDQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ucm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmJsb2NrIHtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDsgLyogQWRkIGJvcmRlcnMgZm9yIHZpc3VhbGl6YXRpb24gKi9cXG4gICAgbWFyZ2luOiAxcHg7XFxufVxcblxcbi8qIC5ob3ZlcmJsb2NrIHtcXG5cXG59ICovXFxuXFxuLmhvdmVyLWJsb2NrOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcbn1cXG5cXG4uZGFyay1ncmV5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ0NDtcXG59XFxuXFxuLnJlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLndoaXRlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5ncmVlbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVueWVsbG93O1xcbn1cXG5cXG4ucGxhY2Utc2hpcC1jb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzksIDIyMywgMjA0LCAwLjUpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnBsYWNlLXNoaXAge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB3aWR0aDogMzUwcHg7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTksIDIxMywgMjA2KTtcXG59XFxuXFxuLnBsYWNlLXNoaXAtaW5zdHJ1Y3Rpb24ge1xcbiAgICBmb250LWZhbWlseTogJ0dpbGwgU2FucycsICdHaWxsIFNhbnMgTVQnLCBDYWxpYnJpLCAnVHJlYnVjaGV0IE1TJyxcXG4gICAgICAgIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcXG59XFxuXFxuLmF4aXMge1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA4ZThlO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuXFxuLmF4aXM6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzg3Nzc3O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXNlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXNlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImdhbWUiLCJnYW1lMSIsInN0YXJ0R2FtZSIsInBsYXllciIsImdhbWVib2FyZCIsInNoaXAiLCJyYW5kb21Db29yZCIsInBsYXllcnMiLCJib2FyZHMiLCJwbGFjZVNoaXBzIiwicGxheWVyU2hpcHMiLCJib3RTaGlwcyIsImF4aXMiLCJwbGFjZVNoaXBzT3ZlcmxheSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInJlZHJhd1BsYWNlbWVudEJvYXJkIiwicmVkcmF3Qm9hcmQiLCJnZXRCb2FyZCIsInBsYWNlQm90U2hpcHMiLCJyYW5kb21Db29yZDEiLCJsZW5ndGgiLCJjdXJyZW50U2hpcCIsInBvcCIsImNvb3JkIiwiZ2V0UmFuZG9tQ29vcmQiLCJhZGRTaGlwIiwicHVzaCIsImFkZFBsYWNlbWVudExpc3RlbmVycyIsImNoYW5nZUF4aXMiLCJheGlzQnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNoZWNrUGxhY2VtZW50Q2xpY2siLCJjaGVja1BsYWNlbWVudCIsImJsb2NrcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYmxvY2siLCJldmVudCIsImNsaWNrZWRDb29yZGluYXRlcyIsImdldENsaWNrZWRDb29yZGluYXRlcyIsInN0eWxlIiwiZGlzcGxheSIsInJlZHJhdyIsImlzR2FtZU92ZXIiLCJjcmVhdGVCbG9jayIsInZhbHVlIiwiYm9hcmROYW1lIiwibmV3QmxvY2siLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwieCIsInkiLCJkYXRhc2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9hcmQiLCJib2FyZEVsZW1lbnQiLCJpbm5lckhUTUwiLCJpIiwibmV3Um93IiwiaiIsImFwcGVuZENoaWxkIiwiY2xpY2tlZEJsb2NrIiwidGFyZ2V0IiwicGFyc2VJbnQiLCJjbGlja0hhbmRsZXIiLCJhdHRhY2siLCJyZW1vdmVDbGlja0V2ZW50TGlzdGVuZXJzRm9yQm9hcmQiLCJhZGRDbGlja0V2ZW50TGlzdGVuZXJzRm9yQm9hcmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2hlY2tXaW5uZXIiLCJpc0FsbFN1bmtlbiIsIndpbm5lciIsImFsZXJ0IiwiY2xlYXJCb2FyZHMiLCJjbGVhckJvYXJkIiwiQXJyYXkiLCJmcm9tIiwiZmlsbCIsInNoaXBzIiwiYW5vdGhlclNoaXBBdExvY2F0aW9uIiwiY29vcmRWYWwiLCJjb29yZGluYXRlIiwiZGlyZWN0aW9uIiwiY29vcmRpbmF0ZVN5bWJvbCIsInN0YXJ0WCIsInN0YXJ0WSIsImdldExlbmd0aCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tDb29yZCIsImhpdCIsImV2ZXJ5IiwiaXNTdW5rZW4iLCJwbGF5ZXJUeXBlIiwidHlwZSIsImJvdFJhbmRvbUNvb3JkIiwicGxheWVkQ29vcmQiLCJpc0Nvb3JkaW5hdGVEdXBsaWNhdGUiLCJzb21lIiwicHJldkNvb3JkIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=