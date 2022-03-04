let canvas;
let ctx;
let mousePos;
let worldLength = 25;
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

function update() {
    ctx.fillStyle = 'rgb(69, 180, 250)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    world.draw();

    ctx.strokeStyle = 'white';

    let x = 0;
    let y = 0;
    
    for (let i = 0; i < 9; i++) {
        x = 0;

        for (let i = 0; i < worldLength; i++) {
            ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);

            x++;
        }

        y++;
    }
}

function setID(id) {
    ID = id;
}

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    world = new World([]);
    Tiles = new TileManager();

    canvas.width = tileSize * worldLength;
    canvas.height = tileSize * 9;

    ctx.imageSmoothingEnabled = false;

    document.getElementById('add-length').onclick = function () {
        worldLength += document.getElementById('amount').value ? typeof document.getElementById('amount').value == Number : null;
    }

    canvas.addEventListener('click', (e) => {
        mousePos = getMousePos(canvas, e);

        Tiles.addTile(getMousePos, ID)
    });

    setInterval(update, 1000 / 60);
}