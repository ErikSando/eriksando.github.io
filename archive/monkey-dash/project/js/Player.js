class Player {
    speed = 500;
    jumpPower = 1680;

    vel = {
        x: 0,
        y: 0
    }

    anims = {
        left: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation()
        },

        right: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation()
        }
    }

    direction = 'right';

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.anim = this.anims[this.direction].idle;
    }

    Update(delta) {

    }

    Draw(ctx) {
        ctx.drawImage(this.anim.GetImage(), this.x, this.y, this.w, this.h);
    }
}