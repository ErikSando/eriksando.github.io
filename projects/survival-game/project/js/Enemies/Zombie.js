class Zombie {
    constructor(x, y, w, h, img, defence = 100, attack = 20, speed = 4, jumpForce = 18, senseDistance = 5) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.w = w;
        this.h = h;
        this.img = img;
        this.defence = defence;
        this.maxDefence = defence;
        this.attack = attack;
        this.speed = speed;
        this.walkSpeed = Math.ceil(speed / 2);
        this.sprintSpeed = speed;
        this.jumpForce = jumpForce;
        this.grounded = false;
        this.gravity = 0;
        this.direction = 0;
        this.senseDistance = senseDistance;
        this.chasingPlayer = false;
        this.debounce = false;
    
        this.walkRandomly = setInterval(() => {
            if (this.chasingPlayer) return;
            
            this.speed = this.walkSpeed;

            this.direction = Math.floor(Math.random() * (2 + 1) - 1);
        }, 2000);
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
    }

    kill() {
        delete this;
    }

    update(/*dt*/) {
        this.dx = this.direction * this.speed;
        this.dy = 0;

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

        if (Math.abs(player.x - (this.x - camOffset.x)) < tileSize * this.senseDistance && Math.abs(player.y - (this.y - camOffset.y)) < tileSize * this.senseDistance) {
            this.speed = this.sprintSpeed;
            
            this.direction = 0;
            this.chasingPlayer = true;

            if (player.x > (this.x - camOffset.x)) this.dx += this.speed;
            else if (player.x < (this.x - camOffset.x)) this.dx -= this.speed;

            if (Math.abs(player.x - (this.x - camOffset.x)) < tileSize && Math.abs(player.y - (this.y - camOffset.y)) < tileSize) {
                if (!this.debounce) {
                    this.debounce = true;

                    player.damage(this.attack);

                    setTimeout(() => { this.debounce = false }, 1000);
                }
            }

        } else this.chasingPlayer = false;

        this.grounded = false;

        for (let i = 0; i < world.tiles.length; i++) {
            let tile = {
                x: world.tiles[i].x,
                y: world.tiles[i].y,
                w: world.tiles[i].w,
                h: world.tiles[i].h,
                top: () => {
                    return world.tiles[i].top()
                },
                bottom: () => {
                    return world.tiles[i].bottom()
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
            
            if (RectIntersection(this.hitboxes.x, tile)) {
                if (this.dx >= 0) {
                    this.dx = tile.x - (this.x + this.w);
                } else {
                    this.dx = tile.x + tile.w - this.x;
                }

                if (this.grounded) {
                    this.gravity = -this.jumpForce;
                }
            }
        }

        this.x += this.dx// * dt;
        this.y += this.dy// * dt;

        if (camOffset.y > 1000) this.kill();
    }

    draw() {
        ctx.fillStyle = 'darkgreen';
        ctx.fillRect(this.x - camOffset.x, this.y - camOffset.y, this.w, this.h);

        // Draw healthbar above head
        if (this.defence < this.maxDefence) {
            // White oultine
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x - camOffset - 20, this.y - camOffset.y - 20, this.w + 40, 20);

            // Grey background
            ctx.fillStyle = 'darkgray';
            ctx.fillRect(this.x - camOffset - 20, this.y - camOffset.y - 18, this.w + 36, 16);

            // Health
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x - camOffset - 18, this.y - camOffset.y - 18, this.w + 36, 16);
        }

        //ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}