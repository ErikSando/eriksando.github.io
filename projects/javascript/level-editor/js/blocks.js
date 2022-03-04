class WorldTile {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}

class Dirt extends WorldTile {}
class Grass extends WorldTile {}
class StaticEnemy extends WorldTile {}
class Enemy extends WorldTile {}
class Lava extends WorldTile {}
class Coin extends WorldTile {}
class Portal extends WorldTile {}