class Mouse {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update(tiles) {
        for (let i = 0; i < tiles.length; i++) {
            ctx.strokeRect(tiles[i][0].x, tiles[i][0].y, tileSize * tiles[i][0].wm, tileSize * tiles[i][0].hm)

            let tileRect = {
                x: tiles[i][0].x,
                y: tiles[i][0].y,
                w: tileSize * tiles[i][0].wm,
                h: tileSize * tiles[i][0].hm
            }

            let mouseRect = {
                x: this.x - mouseSize / 2,
                y: this.y - mouseSize / 2,
                w: mouseSize,
                h: mouseSize
            }

            if (rectIntersection(tileRect, mouseRect)) {
                if (tiles[i][1] == 'tile' && !hitTile) {
                    console.log('u died');

                    hitTile = true;
                }
            }
        }
        
        if (this.y < 100 && level == 3) {
            jumpscare();
        } 
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - mouseSize / 2, this.y - mouseSize / 2, mouseSize, mouseSize);
    }
}