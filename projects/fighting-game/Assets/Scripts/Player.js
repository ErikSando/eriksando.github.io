class Player extends UpdatesEachFrame {
    #cooldownProgress = {
        dash: 0,
        punch: 0,
        ability: {
            1: 0,
            2: 0
        }
    }

    stunned = false;
    debounce = false;
    doubleJumps = 1;
    animation = "idle";

    #maxHealthBarWidth;
    dashing = false;

    constructor(position, ID, scene, animations, stats) {
        super();

        this.scene = scene;
        this.animations = animations;
        this.strength = stats.strength;
        this.speed = stats.speed;
        this.defence = stats.defence;
        this.maxDefence = stats.defence;
        this.maxDoubleJumps = stats.doubleJumps;
        this.jumpForce = stats.jumpForce;
        this.dashForce = stats.dashForce;
        this.abilityDamage = stats.abilityDamage;
        this.healthbar = ID == 1 ? healthBar1 : healthBar2;
        this.healthtext = ID == 1 ? healthText1 : healthText2;
        this.#maxHealthBarWidth = this.healthbar.scale.x;
        this.direction = ID == 1 ? "right" : "left";
        this.cooldowns = {
            dash: cooldowns.dash,
            punch: cooldowns.punch,
            ability: stats.abilityCooldowns
        }

        this.dashCooldown = ID == 1 ? dashCooldown1 : dashCooldown2;
        this.punchCooldown = ID == 1 ? punchCooldown1 : punchCooldown2;
        this.ability1Cooldown = ID == 1 ? ability1Cooldown1 : ability1Cooldown2;
        this.ability2Cooldown = ID == 1 ? ability2Cooldown1 : ability2Cooldown2;

        // Game object used to display animations
        this.GO = new GameObject(position, new Vector(120, 192), false, true, true);
        // this.GO.tag = "player" + ID;
        this.GO.collisionGroup = PlayerCollisionGroup;
        // this.GO.CombatManager = new CombatManager(this);

        this.target = ID == 1 ? "player2" : "player1";

        // Hitbox used for combat
        this.Hitbox = new GameObject(new Vector(position.x + 10, position.y), new Vector(100, 192), false, false, false);
        this.Hitbox.opacity = 0;
        this.Hitbox.tag = "player" + ID;
        this.Hitbox.CombatManager = new CombatManager(this);

        //Debug.AddRectangle(this.Hitbox);

        this.keybinds = ID == 1 ? Player1Keybinds : Player2Keybinds;

        this.Hitbox.CombatManager.OnDeath.AddListener(() => {

        });

        scene.Add(this.GO, this.Hitbox);
    }

    // Declaration
    Ability1() {}
    Ability2() {}

    Update(delta) {
        this.healthbar.scale.x = (this.defence / this.maxDefence) * this.#maxHealthBarWidth;
        this.healthtext.text = this.defence + " / " + this.maxDefence;

        // TODO: fix the shitty cooldowns UI
        // reposition the cooldown things so that the cooldown goes down
        this.dashCooldown.scale.y = 50 * Clamp(Math.abs(this.#cooldownProgress.dash - this.cooldowns.dash), 0, 1);
        this.punchCooldown.scale.y = 50 * Clamp(Math.abs(this.#cooldownProgress.punch - this.cooldowns.punch), 0, 1);
        this.ability1Cooldown.scale.y = 50 * Clamp(Math.abs(this.#cooldownProgress.ability[1] - this.cooldowns.ability[1]), 0, 1);
        this.ability2Cooldown.scale.y = 50 * Clamp(Math.abs(this.#cooldownProgress.ability[2] - this.cooldowns.ability[2]), 0, 1);

        let xMovement = 0;
        if (Input.GetKey(this.keybinds.left)) xMovement--;
        if (Input.GetKey(this.keybinds.right)) xMovement++;

        this.GO.velocity.x = !this.dashing ? xMovement * this.speed : this.GO.velocity.x;

        let grounded = this.GO.collision.below;
        if (grounded) this.doubleJumps = this.maxDoubleJumps;

        if (Input.GetKey(this.keybinds.jump) && (grounded || this.doubleJumps > 0)) {            
            let allowedToJump = true;
            
            if (!grounded) {
                if (Input.GetKeyDown(this.keybinds.jump)) this.doubleJumps--;
                else allowedToJump = false;
            }
            
            if (allowedToJump) this.GO.velocity.y = -this.jumpForce;
        }

        // Slow down if dashing
        if (this.GO.velocity.x > this.speed || this.GO.velocity.x < -this.speed) {
            this.animation = "dash";
            this.GO.velocity.x = Lerp(this.GO.velocity.x, 0, 2.5 * delta);
        
        } else this.dashing = false;

        if (this.GO.velocity.x > 0) this.direction = "right";
        else if (this.GO.velocity.x < 0) this.direction = "left";

        this.animation = "idle";

        if (this.GO.velocity.x != 0 && grounded) this.animation = "run";

        if (this.GO.velocity.y < 0) this.animation = "jump";
        else if (this.GO.velocity.y > 0) this.animation = "fall";

        if (this.dashing) this.animation = "dash";

        let newAnimation = this.animations[this.animation];

        newAnimation.flipX = this.direction == "right" ? false : true;
        if (this.GO.animation != newAnimation) this.GO.animation = newAnimation;

        this.#cooldownProgress.dash = Clamp(this.#cooldownProgress.dash + delta, 0, this.cooldowns.dash);
        this.#cooldownProgress.punch = Clamp(this.#cooldownProgress.punch + delta, 0, this.cooldowns.punch);
        this.#cooldownProgress.ability[1] = Clamp(this.#cooldownProgress.ability[1] + delta, 0, this.cooldowns.ability[1]);
        this.#cooldownProgress.ability[2] = Clamp(this.#cooldownProgress.ability[2] + delta, 0, this.cooldowns.ability[2]);

        if (Input.GetKeyDown(this.keybinds.dash) && this.#cooldownProgress.dash >= this.cooldowns.dash && !this.debounce) {
            this.#cooldownProgress.dash = 0;

            this.GO.velocity.x = this.direction == "right" ? this.dashForce : -this.dashForce;
            this.dashing = true;
        }

        if (Input.GetKeyDown(this.keybinds.punch) && this.#cooldownProgress.punch >= this.cooldowns.punch && !this.debounce) {
            this.#cooldownProgress.punch = 0;

            let punchHitbox;

            if (this.direction == "right") punchHitbox = new Rectangle(this.GO.position, new Vector(this.GO.scale.x * 2, this.GO.scale.y / 2));
            else punchHitbox = new Rectangle(new Vector(this.GO.position.x - this.GO.scale.x, this.GO.position.y), new Vector(this.GO.scale.x * 2, this.GO.scale.y / 2))

            let hits = GameObjectsInRect(punchHitbox, [this.GO]);

            for (let hit of hits) {
                if (hit.tag == this.target) hit.CombatManager.Damage(this.strength);
            }
        }

        if (Input.GetKeyDown(this.keybinds.ability[1]) && this.#cooldownProgress.ability[1] >= this.cooldowns.ability[1] && !this.debounce) {
            this.#cooldownProgress.ability[1] = 0;
            this.debounce = true;

            this.Ability1();
        }

        if (Input.GetKeyDown(this.keybinds.ability[2]) && this.#cooldownProgress.ability[2] >= this.cooldowns.ability[2] && !this.debounce) {
            this.#cooldownProgress.ability[2] = 0;
            this.debounce = true;

            this.Ability2();
        }

        this.GO.animation.Update(delta);

        this.Hitbox.position = this.GO.position.copy();
    }
}

class Erik extends Player {
    #ability1Duration = 400;
    
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Erik, CharacterStats.Erik);
    }

    // slash
    Ability1() {
        let hitbox;
        let animation;

        if (this.direction == "right") {
            hitbox = new Rectangle(new Vector(this.GO.position.x, this.GO.position.y - this.GO.scale.y / 2), new Vector(this.GO.scale.x * 3, this.GO.scale.y * 2));
            animation = new _Animation(Sprites.Attacks.Slash, 40);

        } else {
            hitbox = new Rectangle(new Vector(this.GO.position.x - this.GO.scale.x * 2, this.GO.position.y - this.GO.scale.y / 2), new Vector(this.GO.scale.x * 3, this.GO.scale.y * 2));
            animation = new _Animation(Sprites.Attacks.Slash, 40, true);
        }

        let effect = new Particle(new Vector(hitbox.position.x - this.GO.scale.x / 2, hitbox.position.y), new Vector(hitbox.scale.y, hitbox.scale.y), animation, true);

        this.scene.AddParticles(effect);

        let hits = GameObjectsInRect(hitbox, [this.Hitbox]);

        for (let hit of hits) {
            if (hit.tag == this.target) hit.CombatManager.Damage(this.abilityDamage[1]);
        }

        setTimeout(() => {
            this.debounce = false;

        }, this.#ability1Duration);
    }

    // teleportation slice
    Ability2() {
        this.debounce = false;
    }
}

class Savas extends Player {
    #ability1Duration = 400;

    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Savas, CharacterStats.Savas);
    }

    // ki blast
    Ability1() {
        let hitbox = new GameObject(new Vector(this.GO.center.x - 13, this.GO.center.y - 18), new Vector(26, 18), false, false, false);
        hitbox.velocity.x = this.direction == "right" ? 1200 : -1200;

        hitbox.image = Sprites.Attacks.KiBall;

        hitbox.TouchEnter.AddListener((gameObject) => {
            // if (gameObject.tag == this.target) {
            //     gameObject.CombatManager.Damage(this.abilityDamage[2]);
            // }

            if (this.GO == gameObject || this.Hitbox == gameObject || !gameObject.collidable) return;

            this.scene.Remove(hitbox);

            let exploRadius = 100;

            let explosionAnimation = new _Animation(Sprites.Attacks.KiBlast, 20);
            let explosion = new Particle(new Vector(hitbox.center.x - exploRadius, hitbox.center.y - exploRadius), new Vector(exploRadius * 2, exploRadius * 2), explosionAnimation, true);

            let explosionHitbox = new Circle(new Vector(explosion.position.x + explosion.scale.x / 2, explosion.position.y + explosion.scale.y / 2), exploRadius);

            this.scene.AddParticles(explosion);

            let hits = GameObjectsInCircle(explosionHitbox);

            for (let hit of hits) {
                if (hit.tag == this.target) hit.CombatManager.Damage(this.abilityDamage[1]);
            }
        });

        this.scene.Add(hitbox);

        setTimeout(() => {
            this.debounce = false;

        }, this.#ability1Duration);
    }

    // energy beam
    Ability2() {
        this.debounce = false;
    }
}

class Nythan extends Player {
    #ability1Duration = 500;
    #ability2Duration = 750;

    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Nythan, CharacterStats.Nythan);
    }

    // flames
    Ability1() {
        this.debounce = false;
    }

    // Flying air slash
    Ability2() {
        let hitboxH = this.GO.scale.y * 1.5;
        let hitboxW = hitboxH / 2;

        let hitboxPosition;

        if (this.direction == "right") hitboxPosition = new Vector(this.GO.position.x, this.GO.center.y - hitboxH / 2);
        else hitboxPosition = new Vector(this.GO.position.x, this.GO.center.y - hitboxH / 2);

        let hitbox = new GameObject(hitboxPosition, new Vector(hitboxW, hitboxH), false, false, false);
        hitbox.image = Sprites.Attacks.FlyingSlash;
        hitbox.velocity.x = this.direction == "right" ? 800 : -800;
        hitbox.image.flipX = this.direction == "right" ? false : true;

        Debug.AddRectangle(hitbox);
        
        let hits = [];

        hitbox.TouchEnter.AddListener((gameObject) => {
            if (hits.includes(gameObject)) return;
            hits.push(gameObject);

            if (gameObject.tag == this.target) gameObject.CombatManager.Damage(this.abilityDamage[2]);
        });

        this.scene.Add(hitbox);

        setTimeout(() => {
            Debug.RemoveRectangle(hitbox);
            this.scene.Remove(hitbox);
            this.debounce = false;
        
        }, this.#ability2Duration);
    }
}

class Eryx extends Player {
    #ability1Duration = 800;
    #ability2Duration = 750;

    #tackleSpeed = 2200;

    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Eryx, CharacterStats.Eryx);
    }

    // Tackle
    Ability1() {
        this.GO.velocity.x = this.direction == "right" ? this.#tackleSpeed : -this.#tackleSpeed;
        this.dashing = true;

        let hits = [];

        let registerHit = (gameObject) => {
            if (hits.includes(gameObject)) return;
            hits.push(gameObject);

            if (gameObject.tag == this.target) gameObject.CombatManager.Damage(this.abilityDamage[1]);
        }

        this.GO.TouchEnter.AddListener(registerHit);

        setTimeout(() => {
            this.GO.TouchEnter.RemoveListener(registerHit);
            this.debounce = false;

        }, this.#ability1Duration);
    }

    // Shockwave punch
    Ability2() {
        let image = Sprites.Attacks.ShockwavePunch;

        let hitboxH = this.GO.scale.y * 1.5;
        let hitboxW = hitboxH * image.width / image.height;

        let hitboxPosition;

        if (this.direction == "right") hitboxPosition = new Vector(this.GO.position.x, this.GO.center.y - hitboxH / 2);
        else hitboxPosition = new Vector(this.GO.position.x - hitboxW /2 , this.GO.center.y - hitboxH / 2);

        let hitbox = new GameObject(hitboxPosition, new Vector(hitboxW, hitboxH), false, false, false);
        hitbox.image = image;
        hitbox.velocity.x = this.direction == "right" ? 600 : -600;
        hitbox.image.flipX = this.direction == "right" ? false : true;

        Debug.AddRectangle(hitbox);

        let hits = [];

        hitbox.TouchEnter.AddListener((gameObject) => {
            if (hits.includes(gameObject)) return;
            hits.push(gameObject);

            if (gameObject.tag == this.target) gameObject.CombatManager.Damage(this.abilityDamage[2]);
        });

        this.scene.Add(hitbox);

        setTimeout(() => {
            Debug.RemoveRectangle(hitbox);
            this.scene.Remove(hitbox);
            this.debounce = false;
        
        }, this.#ability2Duration);
    }
}

const CharacterClasses = {
    Erik: Erik,
    Savas: Savas,
    Nythan: Nythan,
    Eryx: Eryx
}