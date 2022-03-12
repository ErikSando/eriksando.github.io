class PlayerUI {
    constructor(size, font) {
        this.size = size;
        this.font = font;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(5, 5, this.size * 2.5, this.size / 3);

        ctx.fillStyle = 'gray';
        ctx.fillRect(7, 7, this.size * 2.5 - 4, this.size / 3 - 4);

        ctx.fillStyle = 'green';
        ctx.fillRect(7, 7, (this.size * 2.5 - 4) * (player.defence / player.maxDefence), this.size / 3 - 4);
        ctx.font = this.size / 3.6 + 'px ' + this.font;

        ctx.fillStyle = 'white';
        ctx.fillText('Health: ' + Math.floor(player.defence), 15, 10 + this.size / 4 - 2, this.size * 2.3);
    }
}