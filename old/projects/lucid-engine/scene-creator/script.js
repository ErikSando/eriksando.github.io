let canvas;
let ctx;
let tileSize = 64;
let xSize;
let ySize;

document.oncontextmenu = (e) => {
    e.preventDefault();
}

let worldData = []

function GetMousePos(canvas, e) {
    let rect = canvas.getBoundingclientRect();
    
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.imageSmoothingEnabled = false;

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.imageSmoothingEnabled = false;
    }

    xSize = document.getElementById('x-size');
    ySize = document.getElementById('y-size');

    for (let i = 0; i < ySize.value; i++) {
        worldData.push([]);
    }

    canvas.onmousedown = (e) => {
        let mousePos = GetMousePos(canvas, e);

        switch(e.button) {
            
        }
    }
}

function update() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'white';

    for (let i = 0; i < ySize; i++) {
        for (let j = 0; j < xSize; j++) {
            ctx.strokeRect(j * tileSize, i * tileSize, tileSize, tileSize);
        }
    }
}