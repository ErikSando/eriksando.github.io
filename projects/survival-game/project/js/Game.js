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
let paused = false;
let enemies = [];
let camOffset = {
    x: 0,
    y: -192
}
let time = 1;
let lastUpdate = Date.now();
let timeCycle;
let timeReversed = false;

let music = new Audio('assets/sounds/music.wav');
music.loop = 'loop';
music.autoplay = 'autoplay';

const tileSize = 64;
const fps = 60;

const bgColour = {
    r: 50,
    g: 180,
    b: 250    
}

const gravity = 30;
const maxFall = 4020;

const playerW = 48;
const playerH = 115;
const speed = 300;
const jumpForce = 720;

const _enemies = [
    {
        class: Zombie,
        w: playerW,
        h: playerH,
        def: 100,
        atk: 20,
        speed: 200,
        jump: 720
    },
    {
        class: Slime,
        w: playerW,
        h: playerH / 2,
        def: 50,
        atk: 15,
        speed: 200,
        jump: 800
    }
]

let mobileGui = document.getElementById('mobile-gui');

// if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
//     mobileGui.classList.remove('hidden');
// }

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
        let r = Math.floor(Math.random() * _enemies.length)

        enemies.push(new _enemies[r].class(
            Math.floor(Math.random() * ((worldLength - 1) * tileSize)),
            -128, // Will change this to get the position of the highest grass block
            _enemies[r].w,
            _enemies[r].h,
            _enemies[r].img,
            _enemies[r].speed,
            _enemies[r].jump)
        );
    }, 15000);

    // Zombie and slime test
    enemies.push(new Zombie(800, 280, playerW, playerH, null, 100, 20, 200, 600, 5));
    enemies.push(new Slime(800, 280, playerW, 48, null, 50, 15, 200, 750, 5));

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.imageSmoothingEnabled = false;
    }

    music.play();

    timeCycle = setInterval(() => {
        if (time + 0.02 > 1) timeReversed = true;
        if (time - 0.02 < 0.02) timeReversed = false;

        if (timeReversed) return time += 0.02;
        time -= 0.02;
    }, 14400)

    if (!newSave && window.localStorage.getItem('save')) return LoadSave();
    
    worldGenerator.createWorld();

    world = new World(worldGenerator.worldData);
    player = new Player(Math.floor(canvas.width / 2) - playerW / 2, Math.floor(canvas.height / 2) - playerH / 2, playerW, playerH, null, 100, 10, speed, jumpForce);
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
    player = new Player(Math.floor(canvas.width / 2) - playerW / 2, Math.floor(canvas.height / 2) - playerH / 2, playerW, playerH, null, 100, 10, speed, jumpForce);
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

    music.pause();
    music.currentTime = 0;
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
    
    let dt = (time - lastUpdate) / 1000;
    lastUpdate = time;

    if (!dt || isNaN(dt) || dt > 1 || dt < 0) return requestAnimationFrame(update);

    player.update(dt);

    for (let i = 0; i < enemies.length; i++) enemies[i].update(dt);
    
    draw();

    requestAnimationFrame(update);
}

function draw() {
    ctx.fillStyle = `rgb(${bgColour.r * time}, ${bgColour.g * time}, ${bgColour.b * time}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    world.draw();
    player.draw();
    playerUI.draw();

    for (let i = 0; i < enemies.length; i++) enemies[i].draw();
}