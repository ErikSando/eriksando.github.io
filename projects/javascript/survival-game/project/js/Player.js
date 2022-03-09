class Player {
    constructor(x, y, w, h, defence, attack, speed, jumpForce) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.w = w;
        this.h = h;
        this.defence = defence;
        this.attack = attack;
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.grounded = false;
        this.gravity = 0;
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

    damage() {

    }

    update() {
        if (this.gravity < 15) {
            this.gravity += 1;
        }

        this.dy += this.gravity;

        if (Input.up && this.grounded) {
            this.dy += -this.jumpForce;
        }

        if (Input.left) {
            this.dx -= this.speed;
        }

        if (Input.right) {
            this.dx += this.speed;
        }

        this.hitboxes = {
            x: {
                x: this.x + this.dx,
                y: this.y,
                w: this.w,
                h: this.h
            },
            y: {
                x: this.x,
                y: this.y + this.dy,
                w: this.w,
                h: this.h
            }
        }

        this.grounded = false;

        for (let i = 0; i < world.tiles; i++) {
            let tileHitbox = {
                x: world.tiles[i].x,
                y: world.tiles[i].y,
                w: world.tiles[i].w,
                h: world.tiles[i].h
            }

            if (RectIntersection(this.hitboxes.x, tileHitbox)) {
                this.dx = 0;
            }

            if (RectIntersection(this.hitboxes.y, tileHitbox)) {
                if (gravity >= 0) {
                    this.grounded = true;
                    gravity = 0;
                    this.dy = tileRect.top() - this.bottom();
                } else {
                    gravity = 0;
                    this.dy = tileRect.bottom() - this.top();
                }
            }
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {

    }
}