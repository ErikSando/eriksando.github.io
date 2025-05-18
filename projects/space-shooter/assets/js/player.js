class Player extends UpdatesEachFrame {
    cruisingSpeed = 300;
    boostingSpeed = 600;
    speed = 400;
    steeringSpeed = 100;
    bulletSpeed = 1000;
    bulletSpread = 1;

    shootCooldown = 0.25;
    #timeSinceLastShot = 0;

    constructor(position) {
        super();

        this.GameObject = new GameObject(position, new Vector(104, 144), false, false, false);
        this.GameObject.animation = new _Animation(Textures.player);
        this.GameObject.alive = true;

        this.Hitbox = new GameObject(new Vector(position.x + 32, position.y), new Vector(40, 144), false, false, false);
        this.Hitbox.opacity = 0;
        this.Hitbox.tag = "player";

        this.Hitbox.onHit = new _Event();
        this.Hitbox.onHit.AddListener(() => this.Kill());

        this.Hitbox.TouchEnter.AddListener((gameObject) => {
            if (gameObject.tag == "border") this.Kill();
        });

        World.Add(this.GameObject, this.Hitbox);
    }

    Kill() {
        this.GameObject.alive = false;

        let animation = new _Animation(Textures.explosion);
        animation.fps = 10;

        let explosion = new Particle(this.Hitbox.center.minus(new Vector(80, 80)), new Vector(160, 160), animation, true);
        World.AddParticles(explosion);

        World.Remove(this.GameObject, this.Hitbox);
        this.RemoveFromGame();
        delete this;
    }

    Update(delta) {
        this.#timeSinceLastShot += delta;

        this.GameObject.orientation += Input.GetAxisRaw("Horizontal") * this.steeringSpeed * delta * DegreesToRadians;

        this.speed = this.cruisingSpeed;
        if (Input.GetKey(KeyCode.KeyW) || Input.GetKey(KeyCode.ArrowUp)) {
            this.speed = this.boostingSpeed;
        }

        if (Input.GetKey("Space") && this.#timeSinceLastShot > this.shootCooldown) {
            this.#timeSinceLastShot = 0;

            let bulletPosition = this.GameObject.center.plus(this.GameObject.direction.forward().multiplied(65)).plus(this.GameObject.direction.left().multiplied(3));
            new Bullet(bulletPosition, this.GameObject, "player", this.bulletSpeed, this.bulletSpread);
        }

        this.GameObject.velocity = this.GameObject.direction.forward().multiplied(this.speed);
        this.Hitbox.velocity = this.GameObject.velocity;
        this.Hitbox.orientation = this.GameObject.orientation;
    }
}