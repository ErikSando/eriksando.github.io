class Player extends UpdatesEachFrame {
    direction = "right";

    constructor(position, useGravity = true) {
        super();

        this.GameObject = new GameObject(position, new Vector(50, 100), false, true, useGravity);
        this.GameObject.animation = this.animation;
        this.GameObject.collisionGroup = PlayerCollisionGroup;

        Game.scene.Add(this.GameObject);
    }

    SetAnimation(animations, name) {
        this.animation = animations[name];
        this.animation.flipX = this.direction == "left";
    }

    Update(delta) {
        if (this.GameObject.animation != this.animation) this.GameObject.animation = this.animation;

        this.animation.Update(delta);
    }
}

class LocalPlayer extends Player {
    animations = {
        idle: new _Animation(Sprites.LocalPlayer.idle),
        move: new _Animation(Sprites.LocalPlayer.move, 3)
    }
    
    animation = this.animations.idle;

    speed = 500;
    jumpPower = 800;

    constructor(position, socket) {
        super(position);

        this.socket = socket;
    }

    Update(delta) {
        super.Update(delta);

        if (this.GameObject.velocity.magnitude > 0) this.socket.emit("set-position", this.GameObject.position.x, this.GameObject.position.y, this.direction);
        
        this.GameObject.velocity.x = Input.GetAxisRaw("Horizontal") * this.speed;

        let grounded = this.GameObject.collision.below;
        if (Input.GetAxisRaw("Vertical") > 0 && grounded) this.GameObject.velocity.y = -this.jumpPower;

        if (this.GameObject.velocity.x > 0) this.direction = "right";
        else if (this.GameObject.velocity.x < 0) this.direction = "left";

        let newAnimation = "idle";
        if (this.GameObject.velocity.x != 0) newAnimation = "move";

        this.SetAnimation(this.animations, newAnimation);
    }
}

class NonLocalPlayer extends Player {
    animations = {
        idle: new _Animation(Sprites.NonLocalPlayer.idle),
        move: new _Animation(Sprites.NonLocalPlayer.move, 3)
    }

    animation = this.animations.idle;

    constructor(position, id) {
        super(position, false);

        this.id = id;
        this.lastPosition = position;
    }

    Remove() {
        Game.scene.Remove(this.GameObject);

        delete this;
    }

    Update(delta) {
        super.Update(delta);
        
        let velocity = this.GameObject.position.minus(this.lastPosition);
        this.lastPosition = this.GameObject.position;

        if (velocity.x > 0) this.direction = "right";
        else if (velocity.x < 0) this.direction = "left";

        let newAnimation = "idle";
        if (velocity.x != 0) newAnimation = "move";

        this.SetAnimation(this.animations, newAnimation);
    }
}