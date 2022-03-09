class Zombie {
    constructor(x, y, w, h, img) {
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
        this.chasingPlayer = false;
    
        setInterval(() => {
            this.direction = Math.floor(Math.random() * (1 + 1) - 1);
        }, 5000);
    }

    update() {
        this.dx = 0;
        this.dy = 0;

        

        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        //ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}