class WorldTile {
    constructor(x, y, w, h, xOffset, yOffset, img, id) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.img = img;
        this.id = id;
    }

    draw() {
        ctx.drawImage(this.img, this.x + this.xOffset, this.y + this.yOffset, this.w, this.h);
    }
}

class Dirt extends WorldTile {}
class Grass extends WorldTile {}
class StaticEnemy extends WorldTile {}
class Enemy extends WorldTile {}
class Lava extends WorldTile {}
class Coin extends WorldTile {}
class Portal extends WorldTile {}