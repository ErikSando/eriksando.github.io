class Player extends UpdatesEachFrame {
    speed = 500;
    jumpPower = 850;
    velocity = Vector.zero();
    direction = "right";
    animation = "idle";
    alive = true;

    constructor(position, scale, scene) {
        super();

        let textures = Textures.player;

        this.animations = {
            left: {
                idle: new _Animation(textures.left.idle),
                run: new _Animation(textures.left.run),
                inair: new _Animation(textures.left.inair)
            },
    
            right: {
                idle: new _Animation(textures.right.idle),
                run: new _Animation(textures.right.run),
                inair: new _Animation(textures.right.inair)
            }
        }

        this.GameObject = new GameObject(position, scale);
        this.GameObject.layer = 3;
        scene.Add(this.GameObject);

        this.GameObject.CollisionEnter.AddListener((gameObject) => {
            let name = gameObject.tag;

            if (name == "spikes" || name == "lava") {
                this.alive = false;
                this.GameObject.opacity = 0;
                RespawnButton.visible = true;
            }
            else if (name == "portal") LevelComplete();
        });

        RespawnButton.Mouse1Down.AddListener(() => {
            this.GameObject.position = new Vector(128, (LevelData[level].length - 1) * blockSize - 112);
            RespawnButton.visible = false;
            this.GameObject.opacity = 1;

            Game.Camera.position = new Vector(
                this.GameObject.position.x - (Game.Settings.NativeWidth - this.GameObject.scale.x) / 2,
                this.GameObject.position.y - (Game.Settings.NativeHeight - this.GameObject.scale.y) / 2
            );

            this.alive = true;
        });
    }

    Update() {
        if (!this.alive) return;

        this.GameObject.velocity.x = Input.GetAxisRaw("Horizontal") * this.speed;

        let grounded = this.GameObject.collisionBelow;

        if (Input.GetAxisRaw("Vertical") > 0 && grounded) this.GameObject.velocity.y = -this.jumpPower;

        if (this.GameObject.velocity.x > 0) this.direction = "right";
        else if (this.GameObject.velocity.x < 0) this.direction = "left";

        this.animation = "idle";
        if (this.GameObject.velocity.x != 0) this.animation = "run";
        if (!grounded) this.animation = "inair";

        let newAnimation = this.animations[this.direction][this.animation];
        if (this.GameObject.animation != newAnimation) this.GameObject.animation = newAnimation;
    }
}