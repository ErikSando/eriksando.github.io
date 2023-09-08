class Player extends UpdatesEachFrame {
    cruisingSpeed = 300;
    flyingSpeed = 500;
    speed = 300;
    steeringSpeed = 80;
    bulletSpeed = 600;

    shootCooldown = 0.25;
    #timeSinceLastShot = 0;

    constructor(position) {
        super();

        this.GameObject = new GameObject(position, new Vector(104, 144), false, false);
        this.GameObject.animation = new _Animation(Textures.player);
        this.GameObject.useGravity = false;

        this.Hitbox = new GameObject(new Vector(position.x + 32, position.y), new Vector(40, 144), false, true);
        this.Hitbox.opacity = 0;
        this.Hitbox.tag = "player";
        this.Hitbox.useGravity = false;

        World.Add(this.GameObject, this.Hitbox);
    }

    Update(delta) {
        this.#timeSinceLastShot += delta;

        this.GameObject.orientation += Input.GetAxisRaw("Horizontal") * this.steeringSpeed * delta;

        this.speed = this.cruisingSpeed;
        if (Input.GetKey(KeyCode.KeyW) || Input.GetKey(KeyCode.ArrowUp)) {
            this.speed = this.flyingSpeed;
        }

        if (Input.GetKey("Space") && this.#timeSinceLastShot > this.shootCooldown) {
            this.#timeSinceLastShot = 0;

            let bulletPosition = new Vector(this.GameObject.position.x, this.GameObject.position.y);
            let bullet = new Bullet(bulletPosition, this.GameObject, this.bulletSpeed);
        }

        this.GameObject.velocity = this.GameObject.direction.forward().multiply(this.speed);

        this.Hitbox.velocity = this.GameObject.velocity;
        this.Hitbox.orientation = this.GameObject.orientation;

        //Game.Settings.BackgroundImageStart = Vector.Subtract(Game.Settings.BackgroundImageStart, this.GameObject.forward().multiply(this.speed / 2));
    }
}