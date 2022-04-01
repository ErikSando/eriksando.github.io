let playerObj = new Rectangle(0, 0, tileSize / (1 + 1/3), tileSize * 1.75);

class Player {
    speed = 420;
    jumpForce = 720;
    velocity = Vector2.ZERO;
    grounded = false;

    constructor(gameObj) {
        this.obj = gameObj;
    }

    update = (delta) => {
        this.velocity.x = 0;

        if (Input.rawAxisKeysDown('up') && this.grounded) this.velocity.y = -this.jumpForce;
        this.velocity.x += Input.rawAxisKeysDown('left') - Input.rawAxisKeysDown('right');

        this.grounded = false;
        for (let i = 0; i < game.scene.gameObjects.length; i++) {
            if (RectIntersection(this.obj, game.scene.gameObjects[i])) {
                
            }
        }

        this.obj.position.x += this.velocity.x / delta;
        this.obj.position.y += this.velocity.y / delta;
    }
}