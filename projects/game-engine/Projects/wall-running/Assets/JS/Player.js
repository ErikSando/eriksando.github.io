class Player extends UpdatesEachFrame {
    speed = 80;
    airMultiplier = 0.2;
    slideMultiplier = 0.02;
    jumpPower = 400;
    groundDrag = 8;
    airDrag = 2;
    slidingDrag = 2;
    wallJumpMultiplier = 2;
    slidingLast = false;

    constructor(position, scene) {
        super();

        this.startPosition = position.copy();

        this.GameObject = new GameObject(position, new Vector(50, 100), false, true, true, true);
        this.GameObject.colour = "red";
        this.GameObject.drag = 8;

        scene.Add(this.GameObject);
    }

    Update(delta) {
        if (this.GameObject.position.y > 1800) this.GameObject.position = this.startPosition.copy();

        // this.GameObject.velocity.x = Lerp(
        //     this.GameObject.velocity.x + Input.GetAxisRaw("Horizontal") * this.speed,
        //     0, this.drag * delta
        // );

        let grounded = this.GameObject.collision.below;

        let speed = this.speed;

        if (grounded) {
            this.GameObject.drag = this.groundDrag;

        } else {
            this.GameObject.drag = this.airDrag;
            speed *= this.airMultiplier;
        }

        let slideKey = Input.GetKey(KeyCode.ShiftLeft);
        let sliding = slideKey;

        if (slideKey) {
            if (!this.slidingLast) {
                this.GameObject.scale.y = 50;
                this.GameObject.position.y += 50;
                this.GameObject.velocity.x *= 1.1; // make it so sliding adds a force but u cant exit the slide with a high velocity to prevent super speed from sliding
            }

            this.GameObject.drag = this.slidingDrag;
            speed *= this.slideMultiplier;
        
        } else {
            if (this.GameObject.scale.y < 100) {
                let objectsAbove = GameObjectsInRect(
                    new Rectangle(
                        new Vector(this.GameObject.position.x, this.GameObject.position.y - this.GameObject.scale.y),
                        this.GameObject.scale,
                        [this.GameObject]
                    )
                );

                if (!objectsAbove.length) {
                    this.GameObject.position.y -= 50;
                    this.GameObject.scale.y = 100;

                    sliding = false;

                } else {
                    this.GameObject.drag = this.slidingDrag;
                    speed *= this.slideMultiplier;
                    sliding = true;
                }
            }
        }

        this.slidingLast = sliding;

        this.GameObject.velocity.x += Input.GetAxisRaw("Horizontal") * speed;

        let jumpDirection = Vector.up();
        let wallRunning = false;
        
        let wallLeft = Raycast(this.GameObject.center, this.GameObject.direction.left(), this.GameObject.scale.x / 2, new RaycastInfo([this.GameObject]));
        let wallRight = Raycast(this.GameObject.center, this.GameObject.direction.right(), this.GameObject.scale.x / 2, new RaycastInfo([this.GameObject]));

        if (wallLeft && !grounded && this.GameObject.velocity.y >= 0) {
            jumpDirection = Vector.FromAngle(-45 * DegreesToRadians);
            jumpDirection.x *= this.wallJumpMultiplier;
            jumpDirection.y *= 2.5;
            wallRunning = true;
        }

        if (wallRight && !grounded && this.GameObject.velocity.y >= 0) {
            jumpDirection = Vector.FromAngle(45 * DegreesToRadians).inversed;
            jumpDirection.x *= this.wallJumpMultiplier;
            jumpDirection.y *= 2.5;
            wallRunning = true;
        }

        if (Input.GetAxisRaw("Vertical") < 0 && (grounded || wallRunning) && !sliding) {
            if (wallRunning) this.GameObject.velocity.y = 0;

            this.GameObject.velocity.add(jumpDirection.multiplied(this.jumpPower));
        }
    }
}