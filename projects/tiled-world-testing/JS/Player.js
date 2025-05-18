class Player extends Rectangle {
    vel = { x: 0, y: 0 }
    direction = "right";

    constructor(x, y) {
        super(x, y, 52, 112);
    }

    Update(delta) {
        

        this.x += this.vel.x * delta;
        this.y += this.vel.y * delta;
    }

    Draw(ctx) {

    }
}