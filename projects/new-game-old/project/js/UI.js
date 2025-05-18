class UIObject {
    visible = true;
    bgColour = "rgb(150, 150, 150)";
    bgOpacity = 1;
    outlineColour = "rgb(80, 80, 80)";
    outlineThickness = 1;
    outlineOpacity = 1;

    constructor(position = Vector.zero, scale = Vector.zero) {
        this.position = position;
        this.scale = scale;

        Game.UI.Add(this);
    }

    Draw(ctx) {
        if (this.outlineThickness > 0 && this.outlineOpacity > 0) {
            ctx.globalAlpha = this.outlineOpacity;
            ctx.strokeStyle = this.outlineColour;
            ctx.lineWidth = this.outlineThickness;

            ctx.rect(
                this.position.x - this.outlineThickness / 2,
                this.position.y - this.outlineThickness / 2,
                this.scale.x + this.outlineThickness,
                this.scale.y + this.outlineThickness
            );

            ctx.stroke();
        }

        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.bgColour;
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

class Button extends UIObject {
    enabled = true;

    mouseover = false;

    Mouse1Down = new _Event();
    Mouse1Up = new _Event();

    Mouse2Down = new _Event();
    Mouse2Up = new _Event();

    Mouse3Down = new _Event();
    Mouse3Up = new _Event();

    MouseEnter = new _Event();
    MouseExit = new _Event();

    constructor(position, scale) {
        super(position, scale);
    }
}

class TextLabel extends UIObject {
    font = "Arial";
    textSize = 25;
    textColour = "white";
    textOpacity = 1;
    textStrokeOpacity = 0;
    textStrokeColour = "black";
    textStrokeThickness = 1;
    textAlignX = TextAlignX.Center;
    textAlignY = TextAlignY.Center;

    constructor(position, scale, text = "") {
        super(position, scale);

        this.text = text;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.font = this.textSize + "px " + this.font;

        let textX, textY;

        if (this.textAlignX == TextAlignX.Left) {
            textX = this.position.x;

        } else if (this.textAlignX == TextAlignX.Center) {
            textX = this.position.x + this.scale.x / 2 - ctx.measureText(this.text).width / 2;

        } else {
            textX = this.position.x = this.scale.x - ctx.measureText(this.text).width;
        }

        if (this.textAlignY == TextAlignY.Top) {
            textY = this.position.y + this.textSize;
        
        } else if (this.textAlignY == TextAlignY.Center) {
            textY = this.position.y + this.scale.y / 2 + this.textSize / 2;
        
        } else {
            textY = this.position.y + this.scale.y;
        }

        ctx.globalAlpha = this.textStrokeOpacity;
        ctx.fillStyle = this.textStrokeColour;
        ctx.strokeText(this.text, textX, textY + this.textSize, this.scale.x);

        ctx.globalAlpha = this.textOpacity;
        ctx.fillStyle = this.textColour;
        ctx.fillText(this.text, textX, textY, this.scale.x);
    }
}

class TextButton extends Button {
    font = "Arial";
    textSize = 25;
    textColour = "white";
    textOpacity = 1;
    textStrokeOpacity = 0;
    textStrokeColour = "black";
    textStrokeThickness = 1;
    textAlignX = TextAlignX.Center;
    textAlignY = TextAlignY.Center;

    constructor(position, scale, text = "") {
        super(position, scale);

        this.text = text;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.font = this.textSize + "px " + this.font;

        let textX, textY;

        if (this.textAlignX == TextAlignX.Left) {
            textX = this.position.x;

        } else if (this.textAlignX == TextAlignX.Center) {
            textX = this.position.x + this.scale.x / 2 - ctx.measureText(this.text).width / 2;

        } else {
            textX = this.position.x = this.scale.x - ctx.measureText(this.text).width;
        }

        if (this.textAlignY == TextAlignY.Top) {
            textY = this.position.y + this.textSize;
        
        } else if (this.textAlignY == TextAlignY.Center) {
            textY = this.position.y + this.scale.y / 2 + this.textSize / 2;
        
        } else {
            textY = this.position.y + this.scale.y;
        }

        ctx.globalAlpha = this.textStrokeOpacity;
        ctx.strokeStyle = this.textStrokeColour;
        ctx.lineWidth = this.textStrokeThickness;
        ctx.strokeText(this.text, textX, textY, this.scale.x);

        ctx.globalAlpha = this.textOpacity;
        ctx.fillStyle = this.textColour;
        ctx.fillText(this.text, textX, textY, this.scale.x);
    }
}

class ImageLabel extends UIObject {
    constructor(position, scale, image = new Image()) {
        super(position, scale);

        this.image = image;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);
    }
}

class ImageButton extends Button {
    constructor(position, scale, image = new Image()) {
        super(position, scale);

        this.image = image;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.drawImage(this.image, this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}