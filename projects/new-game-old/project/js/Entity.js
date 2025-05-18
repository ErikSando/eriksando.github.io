class Entity {
    animation;

    constructor(position = Vector.zero, animations, ID, speed, jumpPower) {
        this.position = position;
        this.animations = animations;
        this.ID = ID;
        this.speed = speed;
        this.jumpPower = jumpPower;
    }

    Draw(ctx) {
        ctx.drawImage(this.image, this.position.x - Game.Camera.position.x, this.position.y - Game.Camera.position.y);
    }
}