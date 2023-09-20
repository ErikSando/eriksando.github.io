class Block extends Rectangle {
    constructor(x, y, w, h, image) {
        super(x, y, w, h);

        this.image = image;
    }

    Draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
}

class Grass extends Rectangle {
    constructor(x, y, w, h) {
        super(x, y, w, h, )
    }
}