let canvas;
let ctx;
let displayRect;
let worldGenerator;
let world;
let player;
let playerUI;
let respawnButton;
let enemySpawner;
let startMenu;
let pauseMenu;
let savedStatus;
let mobile;
let UIsize;
let paused = false;
let extraGuiEnabled = false;
let buttons = [];
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

const Input = new InputHandler();

const bgColour = {
    r: 50,
    g: 180,
    b: 250    
}

const gravity = 1800;
const maxFall = 2400;

const playerW = 48;
const playerH = 115;
const speed = 350;
const jumpForce = 720;

const _enemies = [
    {
        class: Zombie,
        w: playerW,
        h: playerH,
        def: 100,
        atk: 20,
        speed: 250,
        jump: 720
    },
    {
        class: Slime,
        w: playerW,
        h: playerH / 2,
        def: 50,
        atk: 15,
        speed: 250,
        jump: 800
    }
]

window.oncontextmenu = (e) => {
    e.preventDefault();
}

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
    mobileGui = document.getElementById('mobile-gui');
    savedStatus = document.getElementById('saved-status');

    startMenu.classList.add('hidden');

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        mobile = true;
    }

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.imageSmoothingEnabled = false;

    displayRect = {
        x: 0,
        y: 0,
        w: canvas.width,
        h: canvas.height
    }

    worldGenerator = new WorldGenerator();

    enemySpawner = setInterval(() => {
        if (enemies.length > worldLength / 5 || time > 0.5) return;

        let r = Math.floor(Math.random() * _enemies.length)

        enemies.push(
            new _enemies[r].class(
                Math.floor(Math.random() * ((worldLength - 1) * tileSize)),
                -128, // Will change this to get the position of the highest grass block
                _enemies[r].w,
                _enemies[r].h,
                _enemies[r].def,
                _enemies[r].atk,
                _enemies[r].img,
                _enemies[r].speed,
                _enemies[r].jump
            )
        );
    }, 15000);

    // Zombie and slime test
    // enemies.push(new Zombie(worldLength / 2 / tileSize, -128, playerW, playerH, null, 100, 20, 200, 600, 5));
    // enemies.push(new Slime(worldLength / 2 / tileSize, -128, playerW, 48, null, 50, 15, 200, 750, 5));

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.imageSmoothingEnabled = false;

        displayRect = {
            x: 0,
            y: 0,
            w: canvas.width,
            h: canvas.height
        }
    }

    music.play();

    timeCycle = setInterval(() => {
        if (time + 0.01 > 1) timeReversed = false;
        if (time - 0.01 < 0.01) timeReversed = true;

        if (timeReversed) return time += 0.01;
        time -= 0.01;

        time = Number(time.toFixed(2));
    }, 7700);

    UIsize = Math.min(Math.floor(canvas.height / 22) * 4, Math.floor(canvas.width / 11));
    
    worldGenerator.createWorld();

    world = new World(worldGenerator.worldData);
    player = new Player(Math.floor(canvas.width / 2) - playerW / 2, Math.floor(canvas.height / 2) - playerH / 2, playerW, playerH, null, 100, 10, speed, jumpForce);
    playerUI = new PlayerUI(UIsize, 'Arial');

    const respawn = () => {
        player.respawn();
        respawnButton.enabled = false;
    }

    respawnButton = new Button(canvas.width / 2, canvas.height / 2, UIsize / 2, null, 'Respawn', 'Arial', 'white', 'black', 'white', respawn);
    respawnButton.enabled = false;

    buttons.push(respawnButton);

    if (!newSave && window.localStorage.getItem('save')) LoadSave();

    update(Date.now());
}

function LoadSave() {
    let save = JSON.parse(window.localStorage.getItem('save'));
    if (!save) return;

    camOffset = save.camOffset;
    worldGenerator.worldData = save.worldData;

    world = new World(worldGenerator.worldData);
}

function Save() {
    try {
        window.localStorage.setItem('save', JSON.stringify({
            camOffset: camOffset,
            worldData: worldGenerator.worldData
        }));

        savedStatus.innerHTML = 'Saved!';
        setTimeout(() => { savedStatus.innerHTML = '' }, 2000);
    } catch (e) {
        savedStatus.innerHTML = 'Couldn\'t save';
        setTimeout(() => { savedStatus.innerHTML = '' }, 2000);
    }
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
    if (paused) return requestAnimationFrame(update);
    
    let thing = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);

    ctx.setTransform(thing, 0, 0, thing, 0, 0);

    let delta = (time - lastUpdate) / 1000;
    lastUpdate = time;

    if (!delta || isNaN(delta) || delta > 1 || delta < 0) return requestAnimationFrame(update);

    if (player.alive) player.update(delta);

    for (let i = 0; i < enemies.length; i++) {
        let enemyRect = {
            x: enemies[i].x - camOffset.x,
            y: enemies[i].y - camOffset.y,
            w: enemies[i].w,
            h: enemies[i].h
        }

        if (RectIntersection(displayRect, enemyRect)) {
            enemies[i].update(delta);
        }
    }

    draw(delta);

    requestAnimationFrame(update);
}

function draw(delta) {
    ctx.fillStyle = `rgb(${bgColour.r * time}, ${bgColour.g * time}, ${bgColour.b * time}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    world.draw();
    
    for (let i = 0; i < enemies.length; i++) {
        let enemyRect = {
            x: enemies[i].x - camOffset.x,
            y: enemies[i].y - camOffset.y,
            w: enemies[i].w,
            h: enemies[i].h
        }

        if (RectIntersection(displayRect, enemyRect)) {
            enemies[i].draw();
        }
    }

    for (let i = 0; i < buttons.length; i++) if (buttons[i].enabled) buttons[i].draw();

    if (!player.alive) return;
    
    player.draw();
    playerUI.draw(delta);
}