class Player extends UpdatesEachFrame {
    speed = 500;
    jumpPower = 850;
    velocity = Vector.zero();
    direction = "right";
    animation = "idle";
    alive = true;

    #mobileInput = 0;
    #ignoreNextEndL = false;
    #ignoreNextEndR = false;

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

        LeftButton.TouchDown.AddListener(() => this.#mobileInput--);
        LeftButton.TouchEnter.AddListener(() => this.#ignoreNextEndL = true);

        LeftButton.TouchEnd.AddListener(() => {
            if (this.#ignoreNextEndL) {
                this.#ignoreNextEndL = false;
                return;
            }

            this.#mobileInput++;
        });

        RightButton.TouchDown.AddListener(() => this.#mobileInput++);
        RightButton.TouchEnter.AddListener(() => this.#ignoreNextEndR = true);

        RightButton.TouchEnd.AddListener(() => {
            if (this.#ignoreNextEndR) {
                this.#ignoreNextEndR = false;
                return;
            }

            this.#mobileInput--;
        });

        JumpButton.TouchDown.AddListener(() => {
            if (this.GameObject.collision.below) this.GameObject.velocity.y = -this.jumpPower;
        });
    }

    Update() {
        if (!this.alive) return;

        // let mobileInput = 0;

        // if (LeftButton.mouseover) mobileInput--;
        // if (RightButton.mouseover) mobileInput++;

        this.GameObject.velocity.x = Clamp(Input.GetAxisRaw("Horizontal") + this.#mobileInput, -1, 1) * this.speed;

        let grounded = this.GameObject.collision.below;

        if ((Input.GetAxisRaw("Vertical") > 0/* || JumpButton.mouseover */) && grounded) this.GameObject.velocity.y = -this.jumpPower;

        if (this.GameObject.velocity.x > 0) this.direction = "right";
        else if (this.GameObject.velocity.x < 0) this.direction = "left";

        this.animation = "idle";
        if (this.GameObject.velocity.x != 0) this.animation = "run";
        if (!grounded) this.animation = "inair";

        let newAnimation = this.animations[this.direction][this.animation];
        if (this.GameObject.animation != newAnimation) this.GameObject.animation = newAnimation;
    }
}