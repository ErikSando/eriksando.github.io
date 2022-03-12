class PlayerUI {
    constructor(size, font) {
        this.size = size;
        this.font = font;
        this.updateRects();
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(5, 5, this.size * 2, this.size / 3);

        ctx.fillStyle = 'gray';
        ctx.fillRect(7, 7, this.size * 2 - 4, this.size / 3 - 4);

        ctx.fillStyle = 'green';
        ctx.fillRect(7, 7, (this.size * 2 - 4) * (player.defence / player.maxDefence), this.size / 3 - 4);
        ctx.font = this.size / 1.2 + 'px ' + this.font;

        ctx.fillStyle = 'white';
        ctx.fillText('Health: ' + Math.floor(player.defence), 10, 10 + this.size, this.size / 2);

        if (mobile) {
            ctx.fillStyle = 'white';
            ctx.fillRect(5, canvas.height - this.size - 5, this.size, this.size);
            ctx.fillRect(this.size + 10, canvas.height - this.size - 5, this.size, this.size);
            ctx.fillRect(canvas.width - this.size - 5, canvas.height - this.size - 5, this.size, this.size);

            ctx.fillStyle = 'black';
            ctx.fillRect(7, canvas.height - this.size - 3, this.size - 4, this.size - 4);
            ctx.fillRect(this.size + 12, canvas.height - this.size - 3, this.size - 4, this.size - 4);
            ctx.fillRect(canvas.width - this.size - 5 + 2, canvas.height - this.size - 5 + 2, this.size - 4, this.size - 4);

            
            ctx.font = this.size / 1.2 + 'px ' + this.font;
            ctx.fillStyle = 'white'
            let textW = ctx.measureText('◀').width;
            let textH = Math.floor(ctx.measureText('◀').height);
            ctx.fillText('◀', 7, canvas.height - this.size - 3 + textH);
            ctx.fillText('▶', 12 + this.size, canvas.height - this.size - 3 + textH);
        }
        
        this.updateRects();
    }

    updateRects() {
        this.rects = {
            left: {
                x: 5,
                y: canvas.height - this.size - 5,
                w: this.size,
                h: this.size
            },
            right: {
                x: this.size + 10,
                y: canvas.height - this.size - 5,
                w: this.size,
                h: this.size
            },
            up: {
                x: canvas.width - this.size - 5,
                y: canvas.height - this.size - 5,
                w: this.size,
                h: this.size
            }
        }
    }
}