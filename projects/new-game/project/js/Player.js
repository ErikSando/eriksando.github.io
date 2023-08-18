sprites = {
    left: {
        idle: [
            new Image()
        ],

        run: [
            new Image(), new Image(), new Image(), new Image()
        ],

        in_air: [
            new Image()
        ]
    },

    right: {
        idle: [
            new Image()
        ],

        run: [
            new Image(), new Image(), new Image(), new Image()
        ],

        in_air: [
            new Image()
        ]
    }
}

sprites.left.idle[0].src = "assets/textures/player/left_idle.png";

sprites.left.run[0].src = "assets/textures/player/left_run_0.png";
sprites.left.run[1].src = "assets/textures/player/left_run_1.png";
sprites.left.run[2].src = "assets/textures/player/left_run_2.png";
sprites.left.run[3].src = "assets/textures/player/left_run_3.png";

sprites.left.in_air[0].src = "assets/textures/player/left_in_air.png";

sprites.right.idle[0].src = "assets/textures/player/right_idle.png";

sprites.right.run[0].src = "assets/textures/player/right_run_0.png";
sprites.right.run[1].src = "assets/textures/player/right_run_1.png";
sprites.right.run[2].src = "assets/textures/player/right_run_2.png";
sprites.right.run[3].src = "assets/textures/player/right_run_3.png";

sprites.right.in_air[0].src = "assets/textures/player/right_in_air.png";

const animations = {
    left: {
        idle: new _Animation(sprites.left.idle),
        run: new _Animation(sprites.left.run),
        in_air: new _Animation(sprites.left.in_air)
    },

    right: {
        idle: new _Animation(sprites.right.idle),
        run: new _Animation(sprites.right.run),
        in_air: new _Animation(sprites.right.in_air)
    }
}

class Player extends Entity {
    vel = Vector(0, 0);
    #grounded = false;
    #collideNextFrame = "";
    scale = Vector(52, 128);

    constructor(position) {
        super(position, animations, "Player", 500, 1000);

        this.animation = this.animations.right.idle;
        this.image = this.animation.GetImage();
        this.direction = "right";

        Game.RespawnButton.Mouse1Down.AddListener(() => {
            Game.RespawnButton.enabled = false;
            Game.RespawnButton.visible = false;
            Game.Camera.position.x = 0;
            Game.Camera.position.y = Levels[Game.World.level].length * Game.tileSize - window.innerHeight;
            this.vel = Vector(0, 0);
            this.position = Vector(2 * Game.tileSize, window.innerHeight - Game.tileSize * 3);
            this.dead = false;
        });
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.scale.x;
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.scale.y;
    }

    Kill() {
        this.dead = true;
        this.direction = "right";

        Game.RespawnButton.enabled = true;
        Game.RespawnButton.visible = true;
    }

    Update = (delta) => {
        if (this.dead) return;

        this.vel.x = Input.GetAxisRaw("Horizontal") * this.speed;

        this.vel.y += 60;
        this.vel.y = Clamp(this.vel.y, -this.jumpPower, 1200);

        if (Input.GetAxisRaw("Vertical") && this.#grounded) this.vel.y = -this.jumpPower;

        if (this.#collideNextFrame == "Obstacle") {
            this.#collideNextFrame = "";
            this.Kill();

            return;
        
        } else if (this.#collideNextFrame == "Portal") {
            this.vel = Vector(0, 0);
            this.position = Vector(2 * Game.tileSize, window.innerHeight - Game.tileSize * 3);
            Game.Camera.position.x = 0;
            Game.World.NextLevel();
            Game.Camera.position.y = Levels[Game.World.level].length * Game.tileSize - window.innerHeight;

            this.#collideNextFrame = "";
        }

        let nextFrameX = {
            position: Vector(this.position.x + this.vel.x * delta, this.position.y),
            scale: this.scale
        }

        let nextFrameY = {
            position: Vector(this.position.x, this.position.y + this.vel.y * delta),
            scale: this.scale
        }

        this.#grounded = false;
        let setToZero = false;

        for (let block of Game.World.fg_blocks) {
            let blockHitbox = {
                position: Vector(block.position.x - Game.Camera.position.x, block.position.y - Game.Camera.position.y),
                scale: block.scale,
                left: block.left,
                right: block.right,
                top: block.top,
                bottom: block.bottom
            }

            let checkBlock = (b) => {
                let deathBlocks = ["Spikes", "Lava"]

                if (deathBlocks.includes(b.ID)) this.#collideNextFrame = "Obstacle";
                else if (b.ID == "Portal") this.#collideNextFrame = "Portal";
            }

            if (RectIntersection(nextFrameY, blockHitbox)) {
                if (this.vel.y >= 0) {
                    this.vel.y = (blockHitbox.top() - this.bottom()) / delta;
                    this.#grounded = true;

                } else if (this.vel.y < 0) {
                    this.vel.y = (blockHitbox.bottom() - this.top()) / delta;
                    setToZero = true;
                }

                checkBlock(block);
            }

            if (RectIntersection(nextFrameX, blockHitbox)) {
                if (this.vel.x >= 0 && this.left() < block.left()) this.vel.x = (blockHitbox.left() - this.right()) / delta;
                else this.vel.x = (blockHitbox.right() - this.left()) / delta;

                checkBlock(block);
            }
        }

        let animation = "idle";

        if (this.vel.x != 0) {
            animation = "run";

            if (this.vel.x > 0) this.direction = "right";
            else if (this.vel.x < 0) this.direction = "left";
        }

        if (this.vel.y != 0) animation = "in_air";
        if (this.animation != this.animations[this.direction][animation]) this.animation = this.animations[this.direction][animation];

        this.image = this.animation.GetImage();
        this.animation.Update(delta);

        let xCondition1 = this.position.x + this.vel.x * delta < window.innerWidth * 2 / 5 && this.position.x > window.innerWidth * 2 / 5;
        let xCondition2 = this.position.x + this.scale.x + this.vel.x * delta > window.innerWidth * 3 / 5 && this.position.x + this.scale.x < window.innerWidth * 3 / 5;
        let xCondition3 = Game.Camera.position.x + this.vel.x * delta >= 0;
        let xCondition4 = Game.Camera.position.x + this.vel.x * delta <= Levels[Game.World.level][0].length * Game.tileSize - window.innerWidth;

        if ((xCondition1 || xCondition2) && xCondition3 && xCondition4) Game.Camera.position.x += this.vel.x * delta;
        else this.position.x += this.vel.x * delta;

        let yCondition1 = this.position.y + this.vel.y * delta < window.innerHeight / 4 && this.position.y > window.innerHeight / 4;
        let yCondition2 = this.position.y + this.scale.y + this.vel.y * delta > window.innerHeight * 3 / 4 && this.position.y + this.scale.y < window.innerHeight * 3 / 4;
        let yCondition3 = Game.Camera.position.y + this.vel.y * delta >= 0;
        let yCondition4 = Game.Camera.position.y + this.vel.y * delta <= Levels[Game.World.level].length * Game.tileSize - window.innerHeight;

        // make it so the camera will go to exactly the top of the world and not slightly below, and to the bottom of the world and not slightly above
        // also do it with the camera x movement

        if ((yCondition1 || yCondition2) && yCondition3 && yCondition4) Game.Camera.position.y += this.vel.y * delta;
        else this.position.y += this.vel.y * delta;

        if (setToZero) this.vel.y = 0;
    }

    Draw(ctx) {
        if (this.dead) return;

        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}