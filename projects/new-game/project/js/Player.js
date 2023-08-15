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
    #dieNextFrame = false;
    scale = Vector(52, 128);

    constructor(position) {
        super(position, animations, "Player", 500, 1000);

        this.animation = this.animations.right.idle;
        this.image = this.animation.GetImage();
        this.direction = "right";
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
        this.position = Vector(2 * Game.tileSize, window.innerHeight - Game.tileSize * 3);
        Game.Camera.position.y = Levels[Game.World.level].length * Game.tileSize - window.innerHeight;
    }
    
    Update = (delta) => {
        this.vel.x = Input.GetAxisRaw("Horizontal") * this.speed;

        this.vel.y += 60;
        this.vel.y = Clamp(this.vel.y, -this.jumpPower, 1200);

        if (Input.GetAxisRaw("Vertical") && this.#grounded) {
            this.vel.y = -this.jumpPower;
        }

        this.#grounded = false;

        let hitbox = {
            position: this.position,
            scale: this.scale
        }

        let nextFrameX = {
            position: Vector(this.position.x + this.vel.x * delta, this.position.y),
            scale: this.scale
        }

        let nextFrameY = {
            position: Vector(this.position.x, this.position.y + this.vel.y * delta),
            scale: this.scale
        }

        for (let block of Game.World.fg_blocks) {
            let blockHitbox = {
                position: Vector(block.position.x, block.position.y - Game.Camera.position.y),
                scale: block.scale,

                left() {
                    return this.position.x;
                },

                right() {
                    return this.position.x + this.scale.x;
                },

                top() {
                    return this.position.y;
                },

                bottom() {
                    return this.position.y + this.scale.y;
                }
            }
            
            if (RectIntersection(nextFrameX, blockHitbox)) {
                if (this.vel.x >= 0) {
                    this.vel.x = (blockHitbox.left() - this.right()) / delta;
                
                } else if (this.vel.x < 0) {
                    this.vel.x = (blockHitbox.right() - this.left()) / delta;
                }
            }

            if (RectIntersection(nextFrameY, blockHitbox)) {
                if (this.vel.y >= 0) {
                    this.vel.y = (blockHitbox.top() - this.bottom()) / delta;
                    this.#grounded = true;

                } else if (this.vel.y < 0) {
                    this.vel.y = (blockHitbox.bottom() - this.top()) / delta;
                }
            }
        }

        let animation = "idle";

        if (this.vel.x != 0) {
            animation = "run";

            if (this.vel.x > 0) this.direction = "right";
            else if (this.vel.x < 0) this.direction = "left";
        }

        if (this.vel.y != 0) {
            animation = "in_air";
        }

        if (this.animation != this.animations[this.direction][animation]) {
            this.animation = this.animations[this.direction][animation];
        }

        this.image = this.animation.GetImage();
        this.animation.Update(delta);

        this.position.x += this.vel.x * delta;
        //Game.Camera.position.x += this.vel.x * delta;

        // do this same thing below but with the player and camera x position

        let condition1 = this.position.y + this.vel.y * delta < 300 && this.position.y > 300;
        let condition2 = this.position.y + this.vel.y * delta > window.innerHeight - 400 && this.position.y < window.innerHeight - 400;
        let condition3 = Game.Camera.position.y + this.vel.y * delta > 0;
        let condition4 = Game.Camera.position.y + this.vel.y * delta < Levels[Game.World.level].length * Game.tileSize - window.innerHeight;

        if ((condition1 || condition2) && condition3 && condition4) {
            Game.Camera.position.y += this.vel.y * delta;
        
        } else {
            this.position.y += this.vel.y * delta;
        }
    }

    Draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}