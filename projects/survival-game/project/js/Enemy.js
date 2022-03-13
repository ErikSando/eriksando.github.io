class Enemy {
    constructor(x, y, w, h, img, defence = 100, attack = 20, speed = 4, jumpForce = 18, senseDistance = 5) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.defence = defence;
        this.maxDefence = defence;
        this.attack = attack;
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.senseDistance = senseDistance;
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
    
        if (this.defence <= 0) this.kill();
    }

    kill() {
        enemies.splice(this);
    }

    draw() {
        ctx.fillStyle = 'green';
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