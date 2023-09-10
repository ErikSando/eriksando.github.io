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
    direction = "right";
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
        this.#maxHealthBarWidth = this.healthbar.scale.x;
        this.cooldowns = {
            dash: cooldowns.dash,
            punch: cooldowns.punch,
            ability: stats.abilityCooldowns
        }

        // Game object used to display animations
        this.GO = new GameObject(position, new Vector(100, 200));
        this.GO.tag = "player" + ID;
        this.GO.collisionGroup = PlayerCollisionGroup;
        this.GO.CombatManager = new CombatManager(this);

        this.target = ID == 1 ? "player2" : "player1";

        // Hitbox used for combat
        // this.Hitbox = new GameObject(position, new Vector(100, 200));
        // this.Hitbox.tag = "player" + ID;
        // this.Hitbox.CombatManager = new CombatManager(this);

        this.keybinds = ID == 1 ? Player1Keybinds : Player2Keybinds;

        this.GO.CombatManager.OnDeath.AddListener(() => {

        });

        scene.Add(this.GO)//, this.Hitbox);
    }

    // Declaration
    Ability1() {}
    Ability2() {}

    Update(delta) {
        this.healthbar.scale.x = (this.defence / this.maxDefence) * this.#maxHealthBarWidth;

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
        if (this.GO.velocity.x > this.speed) {
            this.animation = "dash";
            this.GO.velocity.x -= 50;
        
        } else if (this.GO.velocity.x < -this.speed) {
            this.animation = "dash";
            this.GO.velocity.x += 50;
        
        } else this.dashing = false;

        if (this.GO.velocity.x > 0) this.direction = "right";
        else if (this.GO.velocity.x < 0) this.direction = "left";

        this.#cooldownProgress.dash += delta;
        this.#cooldownProgress.punch += delta;
        this.#cooldownProgress.ability[1] += delta;
        this.#cooldownProgress.ability[2] += delta;

        if (Input.GetKey(this.keybinds.dash) && this.#cooldownProgress.dash >= this.cooldowns.dash && !this.debounce) {
            this.#cooldownProgress.dash = 0;

            this.GO.velocity.x = this.direction == "right" ? this.dashForce : -this.dashForce;
            this.dashing = true;
        }

        if (Input.GetKey(this.keybinds.punch) && this.#cooldownProgress.punch >= this.cooldowns.punch && !this.debounce) {
            this.#cooldownProgress.punch = 0;

            let punchHitbox;

            if (this.direction == "right") punchHitbox = new Rectangle(this.GO.position, new Vector(this.GO.scale.x * 2, this.GO.scale.y / 2));
            else punchHitbox = new Rectangle(new Vector(this.GO.position.x - this.GO.scale.x, this.GO.position.y), new Vector(this.GO.scale.x * 2, this.GO.scale.y / 2))

            let hits = GameObjectsInRect(punchHitbox, [this.GO]);

            for (let hit of hits) {
                if (hit.tag == this.target) hit.CombatManager.Damage(this.strength);
            }
        }

        if (Input.GetKey(this.keybinds.ability[1]) && this.#cooldownProgress.ability[1] >= this.cooldowns.ability[1] && !this.debounce) {
            this.#cooldownProgress.ability[1] = 0;
            this.debounce = true;

            this.Ability1();
        }

        if (Input.GetKey(this.keybinds.ability[2]) && this.#cooldownProgress.ability[2] >= this.cooldowns.ability[2] && !this.debounce) {
            this.#cooldownProgress.ability[2] = 0;
            this.debounce = true;

            console.log("ability 2");

            this.Ability2();
        }
    }
}

class Erik extends Player {
    #ability1Debounce = 400;
    
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

        let hits = GameObjectsInRect(hitbox, [this.GO]);

        for (let hit of hits) {
            if (hit.tag == this.target) hit.CombatManager.Damage(this.abilityDamage[1]);
        }

        setTimeout(() => {
            this.debounce = false;

        }, this.#ability1Debounce);
    }

    // teleportation slice
    Ability2() {

    }
}

class Savas extends Player {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Savas, CharacterStats.Savas);
    }

    // ki blast
    Ability1() {

    }

    // energy beam
    Ability2() {
        
    }
}

class Nythan extends Player {
    #ability1Duration = 750;

    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Nythan, CharacterStats.Nythan);
    }

    // flames
    Ability1() {

    }

    // Flying air slash
    Ability2() {
        let hitbox = new GameObject(new Vector(this.GO.position.x, this.GO.position.y), new Vector(this.GO.scale.y / 2, this.GO.scale.y), false, false, false);
        hitbox.image = Sprites.Attacks.FlyingSlash;
        hitbox.velocity.x = this.direction == "right" ? 800 : -800;
        hitbox.image.flipX = this.direction == "right" ? false : true;

        let hits = [];

        hitbox.TouchEnter.AddListener((gameObject) => {
            if (hits.includes(gameObject)) return;
            hits.push(gameObject);

            if (gameObject.tag == this.target) gameObject.CombatManager.Damage(this.abilityDamage[2]);
        });

        this.scene.Add(hitbox);

        setTimeout(() => {
            this.scene.Remove(hitbox);
            this.debounce = false;
        
        }, this.#ability1Duration);
    }
}

class Eryx extends Player {
    #ability1Duration = 800;
    #ability2Duration = 1500;

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
        
    }
}

const CharacterClasses = {
    Erik: Erik,
    Savas: Savas,
    Nythan: Nythan,
    Eryx: Eryx
}