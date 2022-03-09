let canvas;
let ctx;
let Input;
let sprites;
let worldGenerator;
let world;
let player;
let gameLoop;
let saveName;
let startMenu;
let pauseMenu;
let camOffset = {
    x: 0,
    y: 0
}

const tileSize = 64;
const fps = 60;
const bgColour = 'rgb(50, 180, 250)';
const playerW = 48;
const playerH = 115;

function GetMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

function RectIntersection(rect1, rect2) {
    if (rect1.x + rect1.w <= rect2.x
    || rect1.x >= rect2.x + rect2.w
    || rect1.y + rect1.h <= rect2.y
    || rect1.y >= rect2.y + rect2.h) return false;
    
    return true;
}

function startGame(newSave) {
    startMenu = document.getElementById('start-menu');
    pauseMenu = document.getElementById('pause-menu');

    startMenu.classList.add('hidden');

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.imageSmoothingEnabled = false;

    Input = new InputHandler();
    Input.enable();

    worldGenerator = new WorldGenerator();

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.imageSmoothingEnabled = false;
    }

    if (!newSave && window.localStorage.getItem('save')) return LoadSave();
    
    worldGenerator.createWorld();

    world = new World(worldGenerator.worldData);
    player = new Player(0, Math.floor(canvas.height / 2), playerW, playerH);

    gameLoop = setInterval(update, 1000 / fps);

    Save();
}

function LoadSave() {
    let save = JSON.parse(window.localStorage.getItem('save'));

    if (!save) return;

    camOffset = save.camOffset;

    worldGenerator.worldData = save.worldData;

    world = new World(save.worldData);
    player = new Player(save.playerX, save.playerY, playerW, playerH);

    gameLoop = setInterval(update, 1000 / fps);
}

function Save() {
    window.localStorage.setItem('save', JSON.stringify({
        playerX: player.x,
        playerY: player.y,
        camOffset: camOffset,
        worldData: worldGenerator.worldData
    }));
}

function SaveAndQuit() {
    Save();

    canvas.classList.add('hidden');
    pauseMenu.classList.add('hidden');
    startMenu.classList.remove('hidden');
}

function PauseGame() {
    clearInterval(gameLoop);
    canvas.classList.add('hidden');
    pauseMenu.classList.remove('hidden');
    Input.disable();
}

function ResumeGame() {
    gameLoop = setInterval(update, 1000 / fps);
    canvas.classList.remove('hidden');
    pauseMenu.classList.add('hidden');
    Input.enable();
}

function update() {
    player.update();

    draw();
}

function draw() {
    ctx.fillStyle = bgColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    world.draw();
    player.draw();
}