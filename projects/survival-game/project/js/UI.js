class UIObject {
    visible = true;
    outlineColour = "black";
    outlineThickness = 1;
    outlineOpacity = 1;
    bgColour = "grey";
    bgOpacity = 1;

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    Draw(ctx) {
        ctx.globalAlpha = this.outlineOpacity;
        ctx.fillStyle = this.outlineColour;
        ctx.fillRect(
            this.x - this.outlineThickness + CameraPosition.x,
            this.y - this.outlineThickness + CameraPosition.y,
            this.w + this.outlineThickness * 2,
            this.h + this.outlineThickness * 2
        );

        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.bgColour;
        ctx.fillRect(this.x + CameraPosition.x, this.y + CameraPosition.y, this.w, this.h);
    }
}

class TextLabel extends UIObject {
    font = "Arial";
    textSize = 25;
    textOpacity = 1;
    textAlignX = "Center";
    textAlignY = "Center";
    textColour = "white";

    constructor(x, y, w, h, text = "") {
        super(x, y, w, h);

        this.text = text;
        this.bgOpacity = 0;
        this.outlineOpacity = 0;
    }

    Draw(ctx) {
        super.Draw(ctx);

        let textX, textY;

        let textWidth = Math.min(ctx.measureText(this.text).width, this.w);

        if (this.textAlignX == "Left") {
            textX = 0;

        } else if (this.textAlignX == "Right") {
            textX = this.w - textWidth;

        } else {
            textX = (this.w - textWidth) / 2;
        }

        if (this.textAlignY == "Top") {
            textY = textSize;

        } else if (this.textAlignY == "Bottom") {
            textY = this.h - this.textSize;

        } else {
            textY = this.h - this.textSize / 2;
        }

        ctx.font = this.textSize + "px " + this.font;
        ctx.globalAlpha = this.textOpacity;
        ctx.fillStyle = this.textColour;
        ctx.fillText(this.text, this.x + textX + CameraPosition.x, this.y + textY + CameraPosition.y, this.w);
    }
}

class ImageLabel extends UIObject {
    imageOpacity = 1;

    constructor(x, y, w, h, image) {
        super(x, y, w, h);

        this.image = image;
        this.bgOpacity = 0;
        this.outlineOpacity = 0;
    }

    Draw(ctx) {
        super.Draw(ctx);

        console.log("Drawing image");

        ctx.globalAlpha = this.imageOpacity;
        ctx.drawImage(this.image, this.x + CameraPosition.x, this.y + CameraPosition.y, this.w, this.h);
    }
}