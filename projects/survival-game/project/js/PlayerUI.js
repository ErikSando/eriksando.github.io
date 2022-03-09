class PlayerUI {
    constructor(w, h, font) {
        this.w = w;
        this.h = h;
        this.font = font;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(5, 5, this.w, this.h);
        ctx.fillStyle = 'gray';
        ctx.fillRect(7, 7, this.w - 4, this.h - 4);
        ctx.fillStyle = 'green';
        ctx.fillRect(7, 7, (this.w - 4) * (player.defence / player.maxDefence), this.h - 4);
        ctx.font = this.h / 1.2 + 'px ' + this.font;
        ctx.fillStyle = 'white';
        ctx.fillText('Health: ' + Math.floor(player.defence), 10, 10 + this.h / 1.5, this.w);
    }
}