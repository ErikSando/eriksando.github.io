class Tile {
    constructor(x, y, w, h, image, id) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
        this.id = id;
    }

    Draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
}