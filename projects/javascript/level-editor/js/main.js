let canvas;
let ctx;
let mousePos;
let world;
let Tiles;

let ID = 1;
let tileSize = 48;

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
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

function update() {
    ctx.fillStyle = 'rgb(69, 180, 250)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    world.draw();

    ctx.strokeStyle = 'white';

    let x = 0;
    let y = 0;
    
    for (let i = 0; i < 9; i++) {
        x = 0;

        for (let i = 0; i < blankData[0].length; i++) {
            ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);

            x++;
        }

        y++;
    }
}

let blankData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function setID(id) {
    ID = id;
}

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    world = new World(blankData);
    Tiles = new TileManager();

    canvas.width = tileSize * blankData[0].length;
    canvas.height = tileSize * 9;

    ctx.imageSmoothingEnabled = false;

    document.getElementById('add-length').onclick = function () {
        if (!typeof document.getElementById('amount').value == Number) return;

        for (i = 0; i < document.getElementById('amount').value; i++) {
            for (let i = 0; i < blankData.length; i++) {
                blankData[i].push(0);
            }
        }

        canvas.width += document.getElementById('amount').value * tileSize;
        world.load(blankData);
    }

    canvas.addEventListener('click', (e) => {
        mousePos = getMousePos(canvas, e);

        Tiles.addTile(getMousePos, ID)
    });

    setInterval(update, 1000 / 60);
}