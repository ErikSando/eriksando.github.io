class Block {
    constructor(x, y, w, h, img, id) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.id = id;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.h;
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.w;
    }

    draw() {
        ctx.drawImage(this.img, this.x - camOffset.x, this.y - camOffset.y, this.w, this.h);
    }
}

class Dirt extends Block {}
class Grass extends Block {}
class Stone extends Block {}