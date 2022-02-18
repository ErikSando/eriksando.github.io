class Tile {
    constructor(x, y, wm, hm) {
        this.x = x;
        this.y = y;
        this.widthMultiplier = wm;
        this.heightsMultiplier = hm;
    }

    draw(colour) {
        console.log(this.x * tileSize, this.y * tileSize);

        ctx.fillStyle = 'rgb(50, 120, 200)';
        ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize * this.widthMultiplier, tileSize * this.heightMultiplier);
    }
}

class Finish extends Tile {
    constructor(x, y) {
        super(x, y);

        this.wm = tileSize,
        this.hm = tileSize
    }
}