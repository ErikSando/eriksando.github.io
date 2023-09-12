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

    #mobileJumping = false;

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

        this.GameObject = new GameObject(position, scale, false, true, true);
        this.GameObject.collisionGroup = new CollisionGroup("player", ["kill"]);
        this.GameObject.layer = 3;

        this.Hitbox = new GameObject(new Vector(position.x + 8, position.y + 8), new Vector(scale.x - 16, scale.y - 16), false, false, false);
        this.Hitbox.opacity = 0;

        scene.Add(this.GameObject, this.Hitbox);

        this.GameObject.TouchEnter.AddListener((gameObject) => {
            if (gameObject.tag == "portal") LevelComplete();
        })

        this.Hitbox.TouchEnter.AddListener((gameObject) => {
            if (gameObject.tag == "spikes" || gameObject.tag == "lava") {
                this.alive = false;
                this.GameObject.opacity = 0;
                RespawnButton.visible = true;
            }
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
            this.#mobileJumping = true;
        });

        JumpButton.TouchEnd.AddListener(() => {
            this.#mobileJumping = false;
        });
    }

    Update(delta) {
        if (!this.alive) return;

        // let mobileInput = 0;

        // if (LeftButton.mouseover) mobileInput--;
        // if (RightButton.mouseover) mobileInput++;

        this.GameObject.velocity.x = Clamp(Input.GetAxisRaw("Horizontal") + this.#mobileInput, -1, 1) * this.speed;

        let grounded = this.GameObject.collision.below;

        if ((Input.GetAxisRaw("Vertical") > 0 || this.#mobileJumping)/* || JumpButton.mouseover */ && grounded) {
            this.GameObject.velocity.y = -this.jumpPower;
            this.grounded = false;
        }

        if (this.GameObject.velocity.x > 0) this.direction = "right";
        else if (this.GameObject.velocity.x < 0) this.direction = "left";

        this.animation = "idle";
        if (this.GameObject.velocity.x != 0) this.animation = "run";
        if (!grounded) this.animation = "inair";

        let newAnimation = this.animations[this.direction][this.animation];
        if (this.GameObject.animation != newAnimation) this.GameObject.animation = newAnimation;

        this.Hitbox.position = new Vector(this.GameObject.position.x + 8 + this.GameObject.velocity.x * delta, this.GameObject.position.y + 8 + this.GameObject.velocity.y * delta);
    }
}