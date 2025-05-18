class Enemy {
    constructor(x = 0, y = 0, w = 0, h = 0, img, defence = 100, attack = 20, speed = 4, jumpForce = 18, senseDistance = 5) {
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

        if (this.defence < this.maxDefence) {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x - camOffset.x - 20, this.y - camOffset.y - 50, this.w + 40, 20);

            ctx.fillStyle = 'darkgray';
            ctx.fillRect(this.x - camOffset.x - 20, this.y - camOffset.y - 48, this.w + 36, 16);

            ctx.fillStyle = 'green';
            ctx.fillRect(this.x - camOffset.x - 18, this.y - camOffset.y - 48, this.w + 36, 16);
        }

        //ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}