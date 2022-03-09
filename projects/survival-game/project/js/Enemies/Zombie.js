class Zombie {
    constructor(x, y, w, h, img, senseDistance) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.w = w;
        this.h = h;
        this.img = img;
        this.defence = 100;
        this.attack = 20;
        this.speed = 5;
        this.jumpForce = 16;
        this.grounded = false;
        this.gravity = 0;
        this.direction = 0;
        this.senseDistance = senseDistance;
        this.chasingPlayer = false;
        this.debounce = false;
    
        this.walkRandomly = setInterval(() => {
            if (!this.chasingPlayer) this.direction = Math.floor(Math.random() * (1 + 1) - 1);
        }, 5000);
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

    update() {
        this.dx = 0;
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
            this.chasingPlayer = true;

            if (player.x > (this.x - camOffset.x)) this.dx += 5;
            else this.dx -= 5;

            if (Math.abs(player.x - (this.x - camOffset.x)) < tileSize && Math.abs(player.y - (this.y - camOffset.y)) < tileSize) {
                console.log('player is within 1 block')

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

        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        ctx.fillStyle = 'darkgreen';
        ctx.fillRect(this.x - camOffset.x, this.y - camOffset.y, this.w, this.h);

        //ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}