// JavaScript source code

var gameStarted = false;
var mouseFlag = 0; // If 1, then inside X. If 2, then inside O.
var mouseButtonFlag = false; // Has the button been pressed?
var playerIsX = false; // Is the player playing as X?
var playerChoosingX = 0;  // 0 - nothing selected, X - 1, O - 2

// What are the defined states for a square
const squareStates = {
    // Ready to listen to events (0)
    READY: "ready",

    // Locked - can no longer listen to events, but can be reset back to ready (1)
    LOCKED: "locked",

    // Marked - this square has been clicked or selected (2)
    MARKED: "marked",

    // Game over - draw or victory/defeat (3)
    FINISHED: "finished"
};

function playGame() {
    renderChoice();
    // renderGrid();

    var canvas = document.getElementById("t3Canvas");

    canvas.addEventListener("mousemove", doMouseMove, false);
    canvas.addEventListener("mousedown", doMouseDown, false);
    canvas.addEventListener("mouseup", doMouseUp, false);
}

function renderChoice() {
    var canvas = document.getElementById("t3Canvas");

    var context = canvas.getContext("2d");

    showXRaised(canvas, context);
    showORaised(canvas, context);
}

function renderGrid() {

    var canvas = document.getElementById("t3Canvas");
    var context = canvas.getContext("2d");

    console.log("playerIsX is " + playerIsX);

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(100, 0);
    context.lineTo(100, 300);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(200, 0);
    context.lineTo(200, 300);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(0, 100);
    context.lineTo(300, 100);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(0, 200);
    context.lineTo(300, 200);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();
}

function doMouseMove(event) {

    var canvas = document.getElementById("t3Canvas");
    canvasLocation = canvas.getBoundingClientRect();

    var canvas_x = parseInt(event.x - canvasLocation.left);
    var canvas_y = parseInt(event.y - canvasLocation.top);

    var txtCoord = document.getElementById("txtCoord");
    txtCoord.value = canvas_x + " " + canvas_y;

    var context = canvas.getContext('2d');

    var x_offset = parseInt(canvas_x / 100);
    var y_offset = parseInt(canvas_y / 100);

    var x_mod = canvas_x % 100;
    var y_mod = canvas_y % 100;

    var txtCoord = document.getElementById("txtCoord");
    txtCoord.value = canvas_x + " " + canvas_y + ", " + x_offset + " " + y_offset + ", " + x_mod + " " + y_mod;

    if (!gameStarted) {

        // Check if user is hovering on x
        if ((canvas_x > 40) && (canvas_y > 100) &&
            (canvas_x < 140) && (canvas_y < 200)) {

            if (mouseFlag != 1) {

                if (mouseFlag == 2) {
                    showORaised(canvas, context);
                }

                if (mouseButtonFlag == true) {
                    showXDepressed(canvas, context);
                } else {
                    showXHighlighted(canvas, context);
                }
          
                mouseFlag = 1;
            }
        } else if ((canvas_x > 160) && (canvas_y > 100) &&
            (canvas_x < 260) && (canvas_y < 200)) {

            if (mouseFlag != 2) {

                if (mouseFlag == 1) {
                    showXRaised(canvas, context);
                }

                if (mouseButtonFlag == true) {
                    showODepressed(canvas, context);
                } else {
                    showOHighlighted(canvas, context);
                }

                mouseFlag = 2;
            }
        } else if (mouseFlag == 1) {

          showXRaised(canvas, context);
          mouseFlag = 0;
        } else if (mouseFlag == 2) {

          showORaised(canvas, context);
          mouseFlag = 0;
        }
    } else {

        if ((x_mod > 25) && (x_mod < 75) &&
            (y_mod > 20) && (y_mod < 80)) {

            var imageObj = new Image();

            imageObj.onload = function() {
                context.drawImage(imageObj, x_offset * 100,  y_offset * 100);
            };

            imageObj.src = 'x.svg';
        }
    }
}

function doMouseDown(event) {

    var canvas = document.getElementById("t3Canvas");
    var context = canvas.getContext('2d');

    if (!gameStarted) {

        if (mouseFlag == 1) {
            playerChoosingX = 1;
            showXDepressed(canvas, context);
        } else if (mouseFlag == 2) {
            playerChoosingX = 2;
            showODepressed(canvas, context);          
        }

        mouseButtonFlag = true;
    } else {

    }
}

function doMouseUp(event) {

    var canvas = document.getElementById("t3Canvas");
    var context = canvas.getContext('2d');

    if (!gameStarted) {

        if ((mouseFlag == 1) && (playerChoosingX == 1)) {

            gameStarted = true;
            playerIsX = true;

        } else if ((mouseFlag == 2) && (playerChoosingX == 2)) {

            gameStarted = true;
            playerIsX = false;
        }

        mouseButtonFlag = false;

        if (gameStarted == true) {
            renderGrid();
        }
    } else {

    }
}

function showXRaised(canvas, context) {

    context.fillStyle = "white";
    context.fillRect(40, 100, 104, 104);

    context.fillStyle = "lightgray";
    context.fillRect(40, 100, 100, 100);

    context.beginPath();
    context.moveTo(142, 100);
    context.lineTo(142, 202);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(40, 202);
    context.lineTo(142, 202);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    var imageObj = new Image();

    imageObj.onload = function() {
      context.drawImage(imageObj, 40, 100);
    };

    imageObj.src = 'x.svg';
}

function showXDepressed(canvas, context) {

    context.fillStyle = "white";
    context.fillRect(40, 100, 104, 104);

    context.fillStyle = "lightgray";
    context.fillRect(44, 104, 100, 100);

    context.beginPath();
    context.moveTo(42, 102);
    context.lineTo(144, 102);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(42, 102);
    context.lineTo(42, 204);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(143, 102);
    context.lineTo(143, 203);
    context.lineWidth = 1;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(43, 203);
    context.lineTo(143, 203);
    context.lineWidth = 1;
    context.strokeStyle = '#888888';
    context.stroke();

    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 43, 103);
    };

    imageObj.src = 'x.filled.svg';
}

function showODepressed(canvas, context) {

    context.fillStyle = "white";
    context.fillRect(160, 100, 104, 104);

    context.fillStyle = "lightgray";
    context.fillRect(164, 104, 100, 100);

    context.beginPath();
    context.moveTo(162, 102);
    context.lineTo(264, 102);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(162, 102);
    context.lineTo(162, 204);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(263, 102);
    context.lineTo(263, 203);
    context.lineWidth = 1;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(163, 203);
    context.lineTo(263, 203);
    context.lineWidth = 1;
    context.strokeStyle = '#888888';
    context.stroke();

    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 163, 103);
    };

    imageObj.src = 'o.filled.svg';
}

function showORaised(canvas, context) {

    context.fillStyle = "white";
    context.fillRect(160, 100, 104, 104);

    context.fillStyle = "lightgray";
    context.fillRect(160, 100, 100, 100);

    context.beginPath();
    context.moveTo(262, 100);
    context.lineTo(262, 202);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    context.beginPath();
    context.moveTo(160, 202);
    context.lineTo(262, 202);
    context.lineWidth = 2;
    context.strokeStyle = '#888888';
    context.stroke();

    var imageObj = new Image();

    imageObj.onload = function() {
      context.drawImage(imageObj, 160, 100);
    };

    imageObj.src = 'o.svg';
}

function showXHighlighted(canvas, context) {

    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 40, 100);
    };

    imageObj.src = 'x.filled.svg';
}

function showOHighlighted(canvas, context) {

    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 160, 100);
    };

    imageObj.src = 'o.filled.svg';
}

class GameManager {
    
    constructor() {

        // Set member reference
        this.gameHost = gameHost;

        // Default number of elements to 9 - always this number for TicTacToe
        this.optionSquares = new Array();

        // 8-element array of winning positions/outcomes - 3 horizontal, 3 vertical, 2 diagonal
        this.winOutcomes = new Array();

        winOutcomes.push(0x07);  // 000000111 = 7
        winOutcomes.push(0x38);  // 000111000 = 56
        winOutcomes.push(0x1c0); // 111000000 = 448
        winOutcomes.push(0x49);  // 001001001 = 73
        winOutcomes.push(0x92);  // 010010010 = 146
        winOutcomes.push(0x124); // 100100100 = 292
        winOutcomes.push(0x111); // 100010001 = 273
        winOutcomes.push(0x54);  // 001010100 = 84
    }
}
