class Tile {
    constructor(x, y, wm, hm) {
        this.x = x;
        this.y = y;
        this.widthMultiplier = wm;
        this.heightMultiplier = hm;
    }

    draw(colour) {
        ctx.fillStyle = colour;
        ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize * this.widthMultiplier, tileSize * this.heightMultiplier);
    }
}

class Finish {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = new Image(src='assets/finish.png');
    }

    draw() {
        ctx.drawImage(this.img, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    }
}