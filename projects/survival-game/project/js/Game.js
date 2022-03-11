let canvas;
let ctx;
let Input;
let worldGenerator;
let world;
let player;
let playerUI;
let gameLoop;
let enemySpawner;
let saveName;
let startMenu;
let pauseMenu;
let gravity = 1 // 18;
let paused = false;
let enemies = [];
let camOffset = {
    x: 0,
    y: 0
}
let lastUpdate = Date.now();

let music = new Audio('assets/sounds/music.wav');
music.loop = 'loop';
music.autoplay = 'autoplay';

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
    worldGenerator = new WorldGenerator();

    enemySpawner = setInterval(() => {
        let enemyClasses = [Zombie];

        enemies.push(new enemyClasses[Math.floor(Math.random() * enemyClasses.length)](Math.floor(Math.random() * ((worldLength - 1) * tileSize), 280, playerW, playerH, null, 4000)));
    }, 15000);

    // Zombie and slime test
    enemies.push(new Zombie(800, 280, playerW, playerH, null, 100, 20, 4, 18, 5));
    //enemies.push(new Slime(800, 280, playerW, 48, null, 50, 10, 4, 22, 5));

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.imageSmoothingEnabled = false;
    }

    music.play();

    if (!newSave && window.localStorage.getItem('save')) return LoadSave();
    
    worldGenerator.createWorld();

    world = new World(worldGenerator.worldData);
    player = new Player(Math.floor(canvas.width / 2) - playerW / 2, Math.floor(canvas.height / 2) - playerH / 2, playerW, playerH, null, 100, 10, 6, 18);
    playerUI = new PlayerUI(Math.floor(canvas.height / 20) * 6, Math.floor(canvas.height / 20), 'Arial');

    //gameLoop = setInterval(update, 1000 / fps);

    update(Date.now());

    Save();
}

function LoadSave() {
    let save = JSON.parse(window.localStorage.getItem('save'));
    if (!save) return;

    camOffset = save.camOffset;
    worldGenerator.worldData = save.worldData;

    world = new World(save.worldData);
    player = new Player(Math.floor(canvas.width / 2) - playerW / 2, Math.floor(canvas.height / 2) - playerH / 2, playerW, playerH, null, 100, 10, 6, 18);
    playerUI = new PlayerUI(Math.floor(canvas.width / 5), Math.floor(canvas.height / 20), 'Arial');

    //gameLoop = setInterval(update, 1000 / fps);

    update(Date.now());
}

function Save() {
    window.localStorage.setItem('save', JSON.stringify({
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
    paused = true;
    canvas.classList.add('hidden');
    pauseMenu.classList.remove('hidden');
}

function ResumeGame() {
    paused = false;
    canvas.classList.remove('hidden');
    pauseMenu.classList.add('hidden');
}

function update(time) {
    if (paused) return;

    let dt = (time - lastUpdate) / (1000 / fps); // 1 / fps seconds sice last update;
    lastUpdate = time;

    if (!dt || isNaN(dt) || dt > 16 || dt < 0) return requestAnimationFrame(update);

    player.update(dt);

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update(dt);
    }
    
    draw();

    requestAnimationFrame(update);
}

function draw() {
    ctx.fillStyle = bgColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    world.draw();
    player.draw();
    playerUI.draw();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}