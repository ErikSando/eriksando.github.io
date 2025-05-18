class Zombie extends Entity {
    walkSpeed = 200;
    sprintSpeed = 250;
    sprinting = false;
    jumpPower = 400;
    grounded = false;
    direction = "right";
    _direction = 0;
    velX = 0;
    velY = 0;
    grounded = false;
    _animation = "idle";
    range = 10;
    hasTarget = false;
    willJump = false;
    #hitboxOffsetX = 0;

    constructor(x, y) {
        super(x, y, 52, 112);

        let images = Images.enemies.zombie;

        this.animations = {
            left: {
                idle: new _Animation(images.left.idle, 1),
                run: new _Animation(images.left.run),
                jump: new _Animation(images.left.jump),
                fall: new _Animation(images.left.fall, 1)
            },

            right: {
                idle: new _Animation(images.right.idle, 1),
                run: new _Animation(images.right.run),
                jump: new _Animation(images.right.jump),
                fall: new _Animation(images.right.fall, 1)
            }
        }

        this.animation = this.animations.right.idle;

        this.moveRandomly = setInterval(() => {
            if (this.hasTarget) return;

            this._direction = RandomInteger(-1, 1);

            setTimeout(() => {
                if (!this.hasTarget) this._direction = 0;

            }, 3000);

        }, 5000);
    }

    Update(delta, player) {
        this.velX = this.sprinting ? this._direction * this.sprintSpeed : this._direction * this.walkSpeed;

        this.velY += Gravity * delta;
        if (this.velY > TerminalVelocity) this.velY = TerminalVelocity;

        let hitbox = Rect(
            this.x + this.#hitboxOffsetX,
            this.y,
            this.w - this.#hitboxOffsetX * 2,
            this.h
        );

        if (this.grounded && this.willJump) this.velY = -this.jumpPower;
        
        let nextFrameX = Rect(hitbox.x + this.velX * delta, hitbox.y, hitbox.w, hitbox.h);
        let nextFrameY = Rect(hitbox.x, hitbox.y + this.velY * delta, hitbox.w, hitbox.h);

        let canSeePlayer = !(
            World.Raycast(this, player) &&
            World.Raycast({ x: this.right(), y: this.y }, player)
        );

        if (canSeePlayer) {
            let distanceFromPlayerX = Math.abs(this.x - player.x);
            let distanceFromPlayer = DistanceBetween(this, player);

            if (distanceFromPlayerX < this.range * blockSize) {
                this._direction = this.x <= player.x ? 1 : -1;
                this.sprinting = true;

                if (distanceFromPlayerX < blockSize / 2) this._direction = 0;
            
            } else {
                this.direction = 0;
            }

        } else {
            this.sprinting = false;
        }
        

        this.grounded = false;
        this.willJump = false;

        for (let block of World.blocks) {
            if (!block.collidable) continue;

            if (RectIntersection(block, nextFrameX)) {
                this.willJump = true;

                if (this.velX >= 0) this.velX = (block.left() - hitbox.right()) / delta;
                else this.velX = (block.right() - hitbox.left()) / delta;
            }

            if (RectIntersection(block, nextFrameY)) {
                if (this.velY >= 0) {
                    this.velY = (block.top() - this.bottom()) / delta;
                    this.grounded = true;
                    
                } else {
                    this.velY = (block.bottom() - this.top()) / delta;
                }
            }
        }

        this._animation = "idle";

        if (this.velX > 0) this.direction = "right";
        else if (this.velX < 0) this.direction = "left";

        if (this.velX != 0 && this.grounded) this._animation = "run";

        if (this.velY > 0) this._animation = "fall";
        else if (this.velY < 0) this._animation = "jump";

        let newAnimation = this.animations[this.direction][this._animation];
        if (this.animation != newAnimation) this.animation = newAnimation;

        this.animation.Update(delta);
        this.image = this.animation.GetImage();

        this.x += this.velX * delta;
        this.y += this.velY * delta;
    }
}