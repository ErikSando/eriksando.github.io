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

function addLength(amount) {
    console.log(amount);
    if (amount > 100) return document.getElementById('error').innerHTML = 'Cannot add more than 100 rows'; setTimeout(document.getElementById('error').innerHTML = '', 1);

    let inc = 1;
    if (amount < 0) inc = -1;

    for (i = 0; i < amount; i++) {
        console.log(i, amount);
        for (let i = 0; i < blankData.length; i++) {
            console.log("adding 1", i);
            console.log("before", blankData[i].length);
            if (inc == 1) blankData[i].push(0);
            else blankData[i].splice(blankData[i].length, 1);
            console.log("after", blankData[i].length);
        }
        
        worldLength += inc;
        canvas.width += document.getElementById('amount').value * tileSize * inc;
    }
    
    let tiles = [];

    for (let i = 0; i < world.tiles.length; i++) {
        tiles.push(world.tiles[i]);
    }

    console.log(worldLength);

    world.reload(blankData);
    world.tiles = tiles;
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

let worldLength = blankData[0].length;

function setID(id) {
    ID = id;
}

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    world = new World(blankData);
    Tiles = new TileManager();

    canvas.width = tileSize * blankData[0].length;
    canvas.height = tileSize * 9;

    ctx.imageSmoothingEnabled = false;

    canvas.onresize = () => {
        ctx.imageSmoothingEnabled = false;
    }

    canvas.onclick = (e) => {
        mousePos = getMousePos(canvas, e);

        Tiles.addTile(getMousePos, ID)
    };

    document.getElementById('file-import').onchange = (e) => {
        let file = e.target.files[0];

        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let data = JSON.parse(readerEvent.target.result)
            let length = data[0].length;
            let diff = length - blankData[0].length;
            console.log(length);
            console.log(diff);
            addLength(diff);

            world.reload(data);
        }
        reader.readAsText(file,'UTF-8');
    }
    
    document.getElementById('export').onclick = () => {
        let template = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]

        console.log(worldLength);
        console.log(world.tiles.length);

        for (let i = 0; i < worldLength; i++) {
            for (let i = 0; i < template.length; i++) {
                template[i].push(0);
            }
        }

        for (let i = 0; i < world.tiles.length; i++) {
            if (world.tiles[i] == 0) continue;

            let x = world.tiles[i].x / tileSize;
            let y = world.tiles[i].y / tileSize;

            template[y][x] = world.tiles[i].id;
        }

        let levelData = JSON.stringify(template);
        let element = document.createElement('a');
        element.href = 'data:attachment/text,' + encodeURI(levelData);
        element.target = '_blank';
        element.download = 'level-data.txt';
        element.click();
    }

    setInterval(update, 1000 / 60);
}