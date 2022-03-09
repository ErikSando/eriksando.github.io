// Load sounds
let clickSound = new Audio();
let music = new Audio();
clickSound.src = 'assets/sounds/select.wav';
music.src = 'assets/sounds/music.wav';

// Variables
let canvas;
let ctx;
let gameLoop;
let world;
let player;
let levelLength;
let mousePos;

let tileSize = 48;
let fps = 60;
let leftKey = false;
let rightKey = false;
let upKey = false;
let cameraOffset = [0, -200];
let level = 1;
let coins = 0;
let totalCoins = 0;
let started = false;
let gameWon = false;
let maxTotalCoins = 0;

let maxCoins;

// Function for getting the mouse position, used on click event
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

// Check for collision between two rectangles
function rectIntersection(rect1, rect2) {
    if (rect1.x + rect1.w <= rect2.x
    || rect1.x >= rect2.x + rect2.w
    || rect1.y + rect1.h <= rect2.y
    || rect1.y >= rect2.y + rect2.h) return false;
    
    return true;
}

// When the final level is complete
function victory() {
    gameWon = true;

    stopwatch.stop();
}

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
    ctx.font = '30px Arial';

    levelLength = levelData[level - 1][0].length;

    world = new World(levelData[level - 1], level);
    player = new Player(canvas.width / 3, canvas.height / 2 - 104, 39, 96);
    stopwatch = new Stopwatch();

    cameraOffset[0] = -player.x + tileSize;

    gameLoop = setInterval(tick, 1000 / fps);

    maxCoins = levelData[level - 1][9];

    for (let i = 0; i < levelData.length; i++) {
        maxTotalCoins += levelData[i][9];
    }

    // Will probably edit this so the player is always on screen
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.imageSmoothingEnabled = false; 
        ctx.font = '30px Arial';
    });

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'a':
                if (!started || gameWon) return;

                leftKey = true;
                break;

            case 'd':
                if (!started || gameWon) return;

                rightKey = true;
                break;

            case ' ':
                if (!started || gameWon) return;

                upKey = true;
                break;

            case 'Enter':
                if (!started) {
                    clickSound.play();
                    started = true;
                    stopwatch.start();
                    music.play();

                    music.onended = function() {
                        music.play();
                    }
                }

                if (!player.alive) {
                    player.respawn(true);
                }

                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch(e.key) {
            case 'a':
                leftKey = false;
                break;

            case 'd':
                rightKey = false;
                break;

            case ' ':
                upKey = false;
                break;
        }
    });

    canvas.addEventListener('click', (e) => {
        mousePos = getMousePos(canvas, e);
        mousePos.w = 1;
        mousePos.h = 1;

        let respawnButtonRect = {
            x: canvas.width / 2 - 70,
            y: canvas.height / 2 - 26,
            w: 140,
            h: 52
        }

        let startButtonRect = {
            x: canvas.width / 2 - 59,
            y: canvas.height / 2 - 26,
            w: 118,
            h: 56
        }

        if (!player.alive) {
            if (rectIntersection(mousePos, respawnButtonRect)) {
                clickSound.play();
                player.respawn(true);

                return;
            }
        }

        if (player.alive && !started) {
            if (rectIntersection(mousePos, startButtonRect)) {
                if (!player.alive) return;

                clickSound.play();
                started = true;
                stopwatch.start();
                music.play();

                music.onended = function() {
                    music.play();
                }

                return;
            }
        }
    });
}

function tick() {
    player.tick();

    if (world.level != level) {
        world = new World(levelData[level - 1], level);
        leftKey = false;
        rightKey = false;
        player.respawn(false);
        coins = 0;
        maxCoins = levelData[level - 1][9];
        cameraOffset = [-player.x + tileSize, -300];
        levelLength = levelData[level - 1][0].length;
    }

    draw();
}

function draw() {
    ctx.fillStyle = 'rgb(69, 180, 250)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (gameWon) {
        ctx.fillStyle = 'white';
        ctx.font = '100px Arial';
        ctx.fillText('You win!', canvas.width / 2 - 184, canvas.height / 3);
        ctx.font = '60px Arial';
        ctx.fillText('Total coins: ' + totalCoins + '/' + maxTotalCoins, canvas.width / 2 - 198, canvas.height / 2.2);
        ctx.fillText('Time: ' + stopwatch.getTime(), canvas.width / 2 - 197, canvas.height / 1.8);

        //clearInterval(gameLoop);

        return;
    }

    if (!started) {
        // Start button
        ctx.fillStyle = 'white';
        ctx.fillRect(canvas.width / 2 - 64, canvas.height / 2 - 27, 128, 58);
        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width / 2 - 62, canvas.height / 2 - 25, 124, 54);
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('Start', canvas.width / 2 - 54, canvas.height / 2 + 18);
        
        // Game by Erik title
        ctx.font = '100px Arial';
        ctx.fillText('Game by Erik', canvas.width / 2 - 301, canvas.height / 4);
        
        // Import level button
        ctx.fillStyle = 'white';
        ctx.fillRect(canvas.width / 2 - 133, canvas.height / 2 + 59, 266, 58);
        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width / 2 - 131, canvas.height / 2 + 61, 262, 54);
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial'
        ctx.fillText('Import level', canvas.width / 2 - 128, canvas.height / 2 + 100);
        ctx.font = '30px Arial';

        return;
    }

    ctx.fillStyle = 'white';
    ctx.fillText('Level: ' + level, 10, 30);
    ctx.fillText('Coins: ' + coins + '/' + maxCoins, 10, 70)
    ctx.fillText(stopwatch.getTime(), 10, 110);

    if (!player.alive) {
        world.draw();
        player.draw();

        return;
    }

    world.draw();
    player.draw();   
}