class Entity {
    image;

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
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

    center() {
        return {
            x: this.x + this.w / 2,
            y: this.y + this.h / 2
        }
    }

    Draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
}