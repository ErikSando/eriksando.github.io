class WorldTile {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }

    top() {
        return this.y - cameraOffset[1];
    }

    bottom() {
        return this.y + this.h - cameraOffset[1];
    }

    left() {
        return this.x - cameraOffset[0];
    }

    right() {
        return this.x + this.w - cameraOffset[0];
    }
}

class Dirt extends WorldTile {
    draw() {
        ctx.drawImage(this.img, this.x - cameraOffset[0], this.y - cameraOffset[1], this.w, this.h);
    }
}

class Grass extends WorldTile {
    draw() {
        ctx.drawImage(this.img, this.x - cameraOffset[0], this.y - cameraOffset[1], this.w, this.h);
    }
}

class StaticEnemy extends WorldTile {
    draw() {
        ctx.drawImage(this.img, this.x - cameraOffset[0], this.y - cameraOffset[1], this.w, this.h);
    }
}

class Enemy extends WorldTile {
    constructor(x, y, w, h, img) {
        super(x, y, w, h, img);

        this.midPoint = this.x;
        this.minX = this.x - tileSize;
        this.maxX = this.x + tileSize;
        this.direction = 0;
    }

    draw() {
        if (this.direction == 0) {
            if (this.midPoint - tileSize >= this.x) {
                this.direction = 1;
                this.x += 1;
            } else {
                this.x -= 1;
            }
        } else {
            if (this.midPoint + tileSize <= this.x) {
                this.direction = 0;
                this.x -= 1;
            } else {
                this.x += 1;
            }
        }

        ctx.drawImage(this.img, this.x - cameraOffset[0], this.y - cameraOffset[1], this.w, this.h);
    }
}

class Lava extends WorldTile {
    draw() {
        ctx.drawImage(this.img, this.x - cameraOffset[0], this.y - cameraOffset[1], this.w, this.h);
    }
}

class Coin extends WorldTile {
    draw() {
        ctx.drawImage(this.img, this.x - cameraOffset[0], this.y - cameraOffset[1], this.w, this.h);
    }
}

class Portal extends WorldTile {
    draw() {
        ctx.drawImage(this.img, this.x - cameraOffset[0], this.y  - cameraOffset[1], this.w, this.h);
    }
}