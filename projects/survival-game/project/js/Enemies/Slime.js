class Slime extends Enemy {
    constructor(x, y, w, h, img, defence = 50, attack = 15, speed = 200, jumpForce = 750, senseDistance = 5) {
        super(x, y, w, h, img, defence, attack, speed, jumpForce, senseDistance);
        
        this.dx = 0;
        this.dy = 0;
        this.maxDefence = defence;
        this.walkSpeed = Math.ceil(speed / 2);
        this.sprintSpeed = speed;
        this.grounded = false;
        this.gravity = 0;
        this.direction = 0;
        this.chasingPlayer = false;
        this.debounce = false;
    
        this.walkRandomly = setInterval(() => {
            if (this.chasingPlayer) return;
            
            this.speed = this.walkSpeed;

            this.direction = Math.floor(Math.random() * (2 + 1) - 1);
        }, 2000);
    }

    update(dt) {
        this.dx = this.direction * this.speed;
        this.dy = 0;

        if (this.gravity < maxFall) this.gravity += gravity;
        this.dy += this.gravity;

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

        if (Math.abs(player.x + player.w / 2 - (this.x + this.w / 2 - camOffset.x)) < tileSize * this.senseDistance && Math.abs(player.y + player.h / 2 - (this.y - camOffset.y)) < tileSize * this.senseDistance && player.alive) {
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
                top: () => { return world.tiles[i].top() },
                bottom: () => { return world.tiles[i].bottom() }
            }

            if (RectIntersection(this.hitboxes.y, tile)) {
                if (this.gravity >= 0) {
                    this.grounded = true;
                    this.gravity = 0;
                    this.dy = (tile.top() - this.bottom()) / dt;

                    if (this.dx != 0) this.gravity = -this.jumpForce;
                } else {
                    this.gravity = 0;
                    this.dy = (tile.bottom() - this.top()) / dt;
                }
            }
            
            if (RectIntersection(this.hitboxes.x, tile)) {
                if (this.dx >= 0) this.dx = (tile.x - (this.x + this.w)) / dt;
                else this.dx = (tile.x + tile.w - this.x) / dt;
            }
        }

        console.log(this.x + camOffset.x, this.x - camOffset.y)

        if ((this.x - camOffset.x) < -Math.floor(worldLength / 2) + Math.floor(canvas.width / tileSize / 2) || (this.x - camOffset.x) > Math.floor(worldLength / 2) + Math.floor(canvas.width / tileSize / 2))

        this.x += this.dx * dt;
        this.y += this.dy * dt;

        if (camOffset.y > 1000) this.kill();
    }
}