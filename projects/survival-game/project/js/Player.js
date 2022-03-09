class Player {
    constructor(x, y, w, h, defence, attack, speed, jumpForce) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.w = w;
        this.h = h;
        this.defence = defence;
        this.maxDefence = defence;
        this.hunger = 10;
        this.spawnLocation = {
            x: worldLength * tileSize / 2,
            y: 0
        }
        this.attack = attack;
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.grounded = false;
        this.gravity = 0;
        this.healing = setInterval(() => {
            if (this.defence < this.maxDefence) this.defence += this.maxDefence / 30;
            if (this.defence > this.maxDefence) this.defence = this.maxDefence;
        }, 1000);
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

    damage(amount) {
        this.defence -= amount;

        if (this.defence <= 0) {
            this.kill();
        }
    }

    kill() {
        this.alive = false;
    }

    respawn() {
        this.alive = true;
        this.defence = this.maxDefence;

        camOffset.x = this.spawnLocation.x;
        camOffset.y = this.spawnLocation.y;
    }

    update() {
        this.dx = 0;
        this.dy = 0;

        if (Input.up && this.grounded) {
            this.gravity = -this.jumpForce;
        }

        // Input.sprint ? this.speed = 8 : this.speed = 5;

        if (Input.left) {
            this.dx -= this.speed;
        }

        if (Input.right) {
            this.dx += this.speed;
        }

        if (this.gravity < 15) {
            this.gravity += 1;
        }

        this.dy += this.gravity;

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

        for (let i = 0; i < world.tiles.length; i++) {
            let tile = {
                x: world.tiles[i].x - camOffset.x,
                y: world.tiles[i].y - camOffset.y,
                w: world.tiles[i].w,
                h: world.tiles[i].h,
                top: () => {
                    return world.tiles[i].top()
                },
                bottom: () => {
                    return world.tiles[i].bottom()
                }
            }

            if (RectIntersection(this.hitboxes.x, tile)) {
                if (this.dx >= 0) {
                    this.dx = tile.x - (this.x + this.w);
                } else {
                    this.dx = tile.x + tile.w - this.x;
                }
            }

            if (RectIntersection(this.hitboxes.y, tile)) {
                if (this.gravity >= 0) {
                    this.grounded = true;
                    this.gravity = 0;
                    this.dy = tile.top() - this.bottom();
                } else {
                    this.gravity = 0;
                    this.dy = tile.bottom() - this.top();
                }
            }
        }

        camOffset.x += this.dx;
        camOffset.y += this.dy;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.w, this.h)
        // ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}