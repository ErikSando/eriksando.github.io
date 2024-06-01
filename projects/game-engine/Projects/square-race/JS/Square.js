class Square {
    constructor(name = "Unnamed", colour = "red", initialVelocity = new Vector(1, 1)) {
        this.name = name;

        this.initialVelocity = initialVelocity.normalised.multiplied(squareSpeed);

        this.velocityX = this.initialVelocity.x;
        this.velocityY = this.initialVelocity.y;

        this.object = new GameObject(squareStart, squareSize);
        this.object.colour = colour;
        this.object.collisionGroup = squareGroup;
        this.object.useGravity = false;
    
        scene.Add(this.object);

        this.savedVelocity = new Vector();
        this.hasStarted = false;

        this.object.CollisionEnter.AddListener((other) => {
            if (other.tag == "victory") Victory(this.name);

            let left = this.object.collision.left;
            let right = this.object.collision.right;
            let above = this.object.collision.above;
            let below = this.object.collision.below;

            if (left || right) {
                console.log("flipping x vel");

                this.velocityX *= -1;
                this.object.velocity.x = this.velocityX;
            }
            if (above || below) {
                console.log("flipping y vel");

                this.velocityY *= -1;
                this.object.velocity.y = this.velocityY;
            }
        });
    }

    Start() {
        if (this.hasStarted) return this.object.velocity = this.savedVelocity;
        
        this.object.velocity = this.initialVelocity;
    }

    Stop() {
        this.savedVelocity = this.object.velocity;
        this.object.velocity = new Vector(0, 0);
    }
}