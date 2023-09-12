let images = Images.player;

class Player extends UpdatesEachFrame {
    speed = 600;
    jumpForce = 800;

    direction = "right";
    animation = "idle";

    animations = {
        left: {
            idle: new _Animation(images.left.idle),
            run: new _Animation(images.left.run),
            jump: new _Animation(images.left.jump),
            fall: new _Animation(images.left.fall)
        },

        right: {
            idle: new _Animation(images.right.idle),
            run: new _Animation(images.right.run),
            jump: new _Animation(images.right.jump),
            fall: new _Animation(images.right.fall)
        }
    }

    constructor() {
        super();

        this.animations.left.idle.fps = 1;
        this.animations.right.idle.fps = 1;

        this.animations.left.fall.fps = 1;
        this.animations.right.fall.fps = 1;

        this.GameObject = new GameObject(new Vector(200, 780), new Vector(100, 200));
        this.GameObject.animation = this.animations.right.idle;

        this.GameObject.CollisionEnter.AddListener((gameObject) => {
            if (gameObject.tag == "Fire") this.Reset();
        });
    }

    Reset() {
        this.GameObject.position = new Vector(200, 780);
        this.GameObject.velocity = Vector.zero();
    }

    Update() {
        this.GameObject.velocity.x = Input.GetAxisRaw("Horizontal") * this.speed;

        let grounded = this.GameObject.collision.below;

        if (Input.GetAxisRaw("Vertical") > 0 && grounded) this.GameObject.velocity.y = -this.jumpForce;

        if (this.GameObject.velocity.x > 0) this.direction = "right";
        else if (this.GameObject.velocity.x < 0) this.direction = "left";

        this.animation = "idle";
        if (this.GameObject.velocity.x != 0 && grounded) this.animation = "run";
        if (this.GameObject.velocity.y > 0) this.animation = "fall";
        if (this.GameObject.velocity.y < 0) this.animation = "jump";

        let newAnimation = this.animations[this.direction][this.animation];
        if (this.GameObject.animation != newAnimation) this.GameObject.animation = newAnimation;

        if (this.GameObject.position.y > 1500) this.Reset();
    }
}