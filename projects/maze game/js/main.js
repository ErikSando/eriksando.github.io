let canvas;
let ctx;
let mouse;
let world;
let gameLoop;
let tileSize;
let mouseSize;
let width;
let height;
let jumpscareImg;

let stepAfterDeath = 0;
let hitTile = false;
let fps = 60;
let level = 1;
let started = false;

let jumpscareSound = new Audio(src='assets/jumpscare.mp3');

function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function rectIntersection(rect1, rect2) {
    if (rect1.x + rect1.w <= rect2.x
    || rect1.x >= rect2.x + rect2.w
    || rect1.y + rect1.h <= rect2.y
    || rect1.y >= rect2.y + rect2.h) return false;
    
    return true;
}

function jumpscare() {
    let step = 0;

    let invertInterval = setInterval(function() {
        if (step % 2 == 0) {
            jumpscareImg.src = 'assets/inverted.png';
        } else {
            jumpscareImg.src = 'assets/jumpscare.png';
        }
        
        step += 1;

        if (step == 10) {
            clearInterval(invertInterval);
            jumpscareImg.classList.add('hidden');
            document.body.style.background = 'white';
        }
    }, 75);

    document.body.style.background = 'black';
    jumpscareSound.play();
    jumpscareImg.classList.remove('hidden');
}

function resize(width, height) {
    ctx.font = '50px Arial';
    ctx.imageSmoothingEnabled = false;
    jumpscareImg = document.getElementById('jumpscare');

    if (width > 1440 && height > 1440) {
        canvas.width = 1440;
        canvas.height = 1440;
        
        tileSize = canvas.width / 15;
        mouseSize = tileSize / 8;

    } else if (width > 1080 && height > 1080) {
        canvas.width = 1080;
        canvas.height = 1080;
        
        tileSize = canvas.width / 15;
        mouseSize = tileSize / 8;
    
    } else if (width > 720 && height > 720) {
        canvas.width = 720;
        canvas.height = 720;
        
        tileSize = canvas.width / 15;
        mouseSize = tileSize / 8;

    } else /* (width > 480 && height > 480) */ {
        canvas.width = 480;
        canvas.height = 480;
        
        tileSize = canvas.width / 15;
        mouseSize = tileSize / 8;
    }
}

window.onload = function (e) {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    resize(window.innerWidth, window.innerHeight);

    world = new World(levelData[level - 1], level);
    mouse = new Mouse(10, 10);

    window.onresize = function () {
        resize(window.innerWidth, window.innerHeight);
    }

    document.onmousemove = function (e) {
        mouse.x = getMousePos(canvas, e).x;
        mouse.y = getMousePos(canvas, e).y;
    }

    let startButtonRect = {
        x: canvas.width / 2 - 100,
        y: canvas.height / 2 - 60,
        w: 200,
        h: 120
    }

    canvas.onclick = function (e) {
        let mousePos = getMousePos(canvas, e);
        mousePos.x, mousePos.y = 1;

        if (rectIntersection(mousePos, startButtonRect)) {
            started = true;
            canvas.style.cursor = 'none';
        }
    }

    gameLoop = setInterval(update, 1000 / fps);
}

function update() {
    if (!level == world.level) {
        world = new World(levelData[level - 1], level);
    }

    draw();
}

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!started) {
        ctx.fillStyle = 'green';
        ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 60, 200, 90);

        ctx.font = '50px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Start', canvas.width / 2 - ctx.measureText('Start').width / 2, canvas.height / 2);
        
        return;
    }

    if (hitTile) {
        world.draw('red');
        mouse.draw();

        stepAfterDeath++;

        if (stepAfterDeath >= 60) {
            stepAfterDeath = 0;
            level = 1;
        }

        return;
    }

    world.draw('green');
    mouse.draw();
}