class Button {
    constructor(x, y, size, img, text, font, outlineColour, bodyColour, textColour, onclick) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.text = text;
        this.font = font;
        this.h = size;
        ctx.font = this.h / 1.5 + ' ' + this.font;
        console.log(ctx.measureText(this.text).width, size)
        this.w = Math.floor(ctx.measureText(this.text).width * 1.25);
        this.outlineColour = outlineColour;
        this.bodyColour = bodyColour;
        this.textColour = textColour;
        this.onclick = onclick;
        this.enabled = true;
        this.x = this.x - this.w / 2;
        this.y = this.y - this.h / 2;
        this.rect = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h
        }

        canvas.onclick = (e) => {
            let mouseRect = {
                x: GetMousePos(canvas, e).x,
                y: GetMousePos(canvas, e).y,
                w: 1,
                h: 1
            }

            if (RectIntersection(mouseRect, this.rect)) {
                this.onclick();
            }
        }
    }

    draw() {
        if (!this.enabled) return;

        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        } else if (this.text) {
            ctx.fillStyle = this.outlineColour;
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = this.bodyColour;
            ctx.fillRect(this.x + 2, this.y + 2, this.w - 4, this.h - 4);

            ctx.font = this.h / 1.5 + ' ' + this.font;
            ctx.fillStyle = this.textColour;
            ctx.fillText(this.text, this.x + (this.w / 1.25) / 2, this.y + this.h / 1.4)
        } else {
            console.error('No text or image, cannot draw button');
        }
    }
}