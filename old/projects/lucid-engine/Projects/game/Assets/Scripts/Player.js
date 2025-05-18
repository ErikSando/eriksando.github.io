let playerObj = new Rectangle(0, 0, tileSize / (1 + 1/3), tileSize * 1.75);

class Player {
    speed = 420;
    jumpForce = 720;
    velocity = Vector2.ZERO;
    grounded = false;
    attack = 10;
    defence = 100;
    maxDefence = 100;
    alive = true;

    HealthChanged = () => {}
    OnDeath = () => {}
    OnRespawn = () => {}

    constructor(gameObj) {
        this.obj = gameObj;
    }

    // Update is called every frame
    update = (delta) => {
        if (!this.alive) return;

        this.velocity.x = 0;

        if (Input.RawMovementKeysDown('Up') && this.grounded) this.velocity.y = -this.jumpForce;
        this.velocity.x += Input.GetAxisRaw('Horizontal');

        this.grounded = false;
        for (let i = 0; i < game.scene.gameObjects.length; i++) {
            if (RectIntersection(this.obj, game.scene.gameObjects[i])) {
                
            }
        }

        this.obj.position = this.obj.position.plus(this.velocity.normalised() / delta * this.speed);
    }

    damage(amount) {
        this.defence -= amount;

        this.HealthChanged(amount);
    
        if (this.defence < 0) {
            this.alive = false;

            this.OnDeath();
        }
    }

    respawn() {
        this.alive = true;

        this.OnRespawn();
    }
}

let player = new Player(playerObj);

game.customUpdates.push(player.update);
