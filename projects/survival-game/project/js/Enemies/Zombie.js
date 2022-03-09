class Zombie {
    constructor(x, y, w, h, img, senseRadius) {
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
        this.direction = 0;
        this.senseRadius = senseRadius;
        this.chasingPlayer = false;
    
        setInterval(() => {
            this.direction = Math.floor(Math.random() * (1 + 1) - 1);
        }, 5000);
    }

    update() {
        this.dx = 0;
        this.dy = 0;

        if (player.x - this.x < tileSize * this.senseRadius || player.x + this.x < tileSize * this.senseRadius)

        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        //ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}