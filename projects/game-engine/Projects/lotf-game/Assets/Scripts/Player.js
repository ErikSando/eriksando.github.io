class Player extends UpdatesEachFrame {
    #cooldownProgress = {
        dash: 0,
        punch: 0,
        ability: {
            1: 0,
            2: 0
        }
    }

    jumpForce = JumpForce;
    dashForce = DashForce;

    stunned = false;
    usingAbility = false;
    doubleJumps = 1;
    direction = "right";
    animation = "idle";

    #maxHealthBarWidth;

    constructor(position, ID, scene, animations, stats) {
        super();

        this.strength = stats.strength;
        this.speed = stats.speed;
        this.defence = stats.defence;
        this.maxDefence = stats.defence;
        this.maxDoubleJumps = stats.doubleJumps;
        this.animations = animations;
        this.healthbar = ID == 1 ? healthBar1 : healthBar2;
        this.#maxHealthBarWidth = this.healthbar.scale.x;
        this.cooldowns = {
            dash: cooldowns.dash,
            punch: cooldowns.punch,
            ability: stats.abilityCooldowns
        }

        // Game object used to display animations
        this.GO = new GameObject(position, new Vector(100, 200));
        this.GO.collisionGroup = PlayerCollisionGroup;

        // Hitbox used for combat
        this.Hitbox = new GameObject(position, new Vector(100, 200));
        this.Hitbox.tag = "player" + ID;
        this.Hitbox.CombatManager = new CombatManager(this);

        this.keybinds = ID == 1 ? Player1Keybinds : Player2Keybinds;

        scene.Add(this.GO)//, this.Hitbox);
    }

    Update(delta) {
        this.healthbar.scale.x = (this.defence / this.maxDefence) * this.#maxHealthBarWidth;

        let xMovement = 0;
        if (Input.GetKey(this.keybinds.left)) xMovement--;
        if (Input.GetKey(this.keybinds.right)) xMovement++;

        this.GO.velocity.x = xMovement * this.speed// >= Math.abs(this.GO.velocity.x) ? xMovement * this.speed : this.GO.velocity.x;

        let grounded = this.GO.collision.below;
        if (grounded) this.doubleJumps = this.maxDoubleJumps;

        if (Input.GetKey(this.keybinds.jump) && (grounded || this.doubleJumps > 0)) {
            if (!grounded) this.doubleJumps--;
            
            this.GO.velocity.y = -this.jumpForce;
        }

        // Slow down if dashing
        if (this.GO.velocity.x > this.speed) {
            this.animation = "dash";
            this.GO.velocity.x -= 10;
        
        } else if (this.GO.velocity.x < -this.speed) {
            this.animation = "dash";
            this.GO.velocity.x += 10;
        }

        this.#cooldownProgress.dash += delta;
        this.#cooldownProgress.punch += delta;
        this.#cooldownProgress.ability[1] += delta;
        this.#cooldownProgress.ability[2] += delta;

        if (Input.GetKey(this.keybinds.dash) && this.#cooldownProgress.dash >= this.#cooldownProgress.dash && !this.usingAbility) {
            this.#cooldownProgress.dash = 0;

            this.velocity.x = this.direction == "right" ? this.dashForce : -this.dashForce;
        }

        if (Input.GetKey(this.keybinds.ability[1]) && this.#cooldownProgress.ability[1] >= this.cooldowns.ability[1] && !this.usingAbility) {
            this.#cooldownProgress.ability[1] = 0;
            
            // ability 1
        }

        if (Input.GetKey(this.keybinds.ability[2]) && this.#cooldownProgress.ability[2] >= this.cooldowns.ability[2] && !this.usingAbility) {
            this.#cooldownProgress.ability[2] = 0;

            // ability 2
        }
    }
}

class Erik extends Player {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Erik, CharacterStats.Erik);
    }
}

class Savas extends Player {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Savas, CharacterStats.Savas);
    }
}

class Nythan extends Player {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Nythan, CharacterStats.Nythan);
    }
}

class Eryx extends Player {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Eryx, CharacterStats.Eryx);
    }
}

const CharacterClasses = {
    Erik: Erik,
    Savas: Savas,
    Nythan: Nythan,
    Eryx: Eryx
}