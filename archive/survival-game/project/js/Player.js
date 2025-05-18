class Player {
    constructor(x = 0, y = 0 , w = 0, h = 0, img, defence = 100, attack = 10, speed = 300, jumpForce = 600) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.w = w;
        this.h = h;
        this.img = img;
        this.defence = defence;
        this.maxDefence = defence;
        this.hunger = 10;
        this.attack = attack;
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.grounded = false;
        this.gravity = 0;
        this.alive = true;
        this.spawnLocation = {
            x: 0,
            y: 0
        }
        this.healing = setInterval(() => {
            if (this.defence < this.maxDefence) this.defence += this.maxDefence / 100;
            if (this.defence > this.maxDefence) this.defence = this.maxDefence;
        }, 500);
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
            this.defence = 0;
            this.kill();
        }
    }

    kill() {
        this.alive = false;

        respawnButton.enabled = true;
    }

    respawn() {
        this.alive = true;
        this.defence = this.maxDefence;
        this.dy = 0;
        
        camOffset.x = this.spawnLocation.x;
        camOffset.y = this.spawnLocation.y;
    }

    update(dt) {
        this.dx = 0;

        if (Input.up && this.grounded) this.dy = -this.jumpForce;
        if (Input.left) this.dx -= this.speed;
        if (Input.right) this.dx += this.speed;

        if (this.dy < maxFall) this.dy += gravity * dt;

        this.hitboxes = {
            x: {
                x: this.x + this.dx * dt,
                y: this.y,
                w: this.w,
                h: this.h
            },
            y: {
                x: this.x,
                y: this.y + this.dy * dt,
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
                top: () => { return world.tiles[i].top() - camOffset.y },
                bottom: () => { return world.tiles[i].bottom() - camOffset.y },
                left: () => { return world.tiles[i].left() - camOffset.x },
                right: () => { return world.tiles[i].right() - camOffset.x }
            }

            if (RectIntersection(this.hitboxes.y, tile)) {
                if (this.gravity >= 0) {
                    this.grounded = true;
                    this.dy = (tile.top() - this.bottom()) / dt;
                } else {
                    this.dy = (tile.bottom() - this.top()) / dt;
                }
            }
            
            if (RectIntersection(this.hitboxes.x, tile)) {
                if (this.dx >= 0) this.dx = (tile.left() - this.right()) / dt;
                else this.dx = (tile.right() - this.left()) / dt;
            }
        }

        camOffset.x += this.dx * dt;
        camOffset.y += this.dy * dt;

        if (camOffset.y > 1500) this.kill();
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        // ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}