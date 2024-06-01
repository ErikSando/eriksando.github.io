class Enemy extends UpdatesEachFrame {
    cruisingSpeed = 300;
    boostingSpeed = 400;
    speed = 250;
    steeringSpeed = 75;
    bulletSpeed = 1000;
    bulletSpread = 2.5;

    shootCooldown = 0.4;
    #timeSinceLastShot = 0;

    steeringDirection = 0;

    constructor(position, player) {
        super();

        this.position = position;
        this.player = player;

        this.GameObject = new GameObject(position, new Vector(104, 144), false, false);
        this.GameObject.animation = new _Animation(Textures.enemy);
        this.GameObject.useGravity = false;

        this.Hitbox = new GameObject(new Vector(position.x + 32, position.y), new Vector(40, 144), false, false);
        this.Hitbox.opacity = 0;
        this.Hitbox.tag = "enemy";
        this.Hitbox.useGravity = false;

        this.Hitbox.onHit = new _Event();
        this.Hitbox.onHit.AddListener(() => this.Kill());

        this.Hitbox.TouchEnter.AddListener((gameObject) => {
            if (gameObject.tag == "border") this.Kill();
        });

        this.flyRandomly = setInterval(() => {
            if (this.player.alive) return;

            this.speed = this.cruisingSpeed;

            if (Random.Integer(1, 3) == 1) this.steeringDirection = Random.Integer(-1, 1);
            else this.steeringDirection = 0;

        }, 1000);
        
        AddEnemy(this);
    }

    Kill() {
        let animation = new _Animation(Textures.explosion);
        animation.fps = 10;

        let explosion = new Particle(this.Hitbox.center.minus(new Vector(80, 80)), new Vector(160, 160), animation, true);
        World.AddParticles(explosion);

        RemoveEnemy(this);
        this.RemoveFromGame();
        delete this;
    }

    Update(delta) {
        if (!this.player.alive) {
            this.GameObject.orientation += this.steeringSpeed * this.steeringDirection * delta * DegreesToRadians;

            // avoid borders

            this.GameObject.velocity = this.GameObject.direction.forward().multiplied(this.speed);
            this.Hitbox.velocity = this.GameObject.velocity;
            this.Hitbox.orientation = this.GameObject.orientation;

            return;
        }

        this.#timeSinceLastShot += delta;

        let direction = this.player.position.plus(this.player.direction.forward().multiplied(1)).minus(this.GameObject.position);
        let distance = direction.magnitude;

        let viewRect = new Rectangle(
            this.GameObject.center.minus(new Vector(Game.Settings.NativeWidth / 2, Game.Settings.NativeHeight / 2)),
            new Vector(Game.Settings.NativeWidth, Game.Settings.NativeHeight)
        );

        if (!RectIntersection(this.player, viewRect)) {
            this.speed = this.cruisingSpeed;

            this.GameObject.velocity = this.GameObject.direction.forward().multiplied(this.speed);
            this.Hitbox.velocity = this.GameObject.velocity;
            this.Hitbox.orientation = this.GameObject.orientation;

            return;
        }

        this.speed = this.boostingSpeed;

        if (direction.x > 0 && direction.y < 0) { // up and right
            this.GameObject.orientation = Math.atan(direction.x / Math.abs(direction.y));

        } else if (direction.x > 0 && direction.y > 0) { // down and right
            this.GameObject.orientation = Math.PI - Math.atan(direction.x / direction.y);

        } else if (direction.x < 0 && direction.y > 0) { // down and left
            this.GameObject.orientation = Math.PI + Math.atan(Math.abs(direction.x) / direction.y);

        } else if (direction.x < 0 && direction.y < 0) { // up and left
            this.GameObject.orientation = 2 * Math.PI - Math.atan(Math.abs(direction.x) / Math.abs(direction.y));
        
        } else if (direction.x == 0) {
            this.GameObject.orientation = (direction.y > 0) ? 180 : 0;

        } else if (direction.y == 0) {
            this.GameObject.orientation = (direction.x >= 0) ? 90 : 270;
        }

        //this.GameObject.orientation *= RadiansToDegrees;

        // console.log(direction.angle);

        // this.GameObject.orientation = direction.angle;

        if (this.#timeSinceLastShot > this.shootCooldown && distance < 600) {
            this.#timeSinceLastShot = 0;

            let bulletPosition = this.GameObject.center.plus(this.GameObject.direction.forward().multiplied(65)).minus(this.GameObject.direction.left().multiplied(3));
            new Bullet(bulletPosition, this.GameObject, "enemy", this.bulletSpeed, this.bulletSpread);
        }

        this.GameObject.velocity = this.GameObject.direction.forward().multiplied(this.speed);
        this.Hitbox.velocity = this.GameObject.velocity;
        this.Hitbox.orientation = this.GameObject.orientation;
    }
}