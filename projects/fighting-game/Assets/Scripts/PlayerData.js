const JumpForce = 1000;
const DashForce = 800;
const cooldowns = {
    dash: 1,
    punch: 1
}

const Characters = ["Erik", "Savas", "Nythan", "Eryx"];

// IDEA: make physical stats similar to real life, ability stats will be the balance
// Erik: very high agility, high strength, high durability, low damage abilities
// Savas: low agility, normal strength, normal durability, high damage abilities
// Eryx: semi low agility, very high strength, very high durability, medium damage abilities

const CharacterStats = {
    Erik: {
        strength: 18,
        speed: 700,
        defence: 200,
        jumpForce: 1150,
        dashForce: 2000,
        doubleJumps: 1,
        abilityCooldowns: {
            1: 5,
            2: 12
        },
        abilityDamage: {
            1: 30,
            2: 45
        }
    },

    Savas: {
        strength: 16,
        speed: 550,
        defence: 180,
        jumpForce: 1000,
        dashForce: 1500,
        doubleJumps: 1,
        abilityCooldowns: {
            1: 4,
            2: 10
        },
        abilityDamage: {
            1: 35,
            2: 60
        }
    },

    Nythan: {
        strength: 14,
        speed: 650,
        defence: 160,
        jumpForce: 1100,
        dashForce: 1800,
        doubleJumps: 2,
        abilityCooldowns: {
            1: 7,
            2: 10
        },
        abilityDamage: {
            1: 60, // this ability will be rapid damage, so not all damage is likely to be taken by opponent
            2: 60
        }
    },

    Eryx: {
        strength: 20,
        speed: 600,
        defence: 240,
        jumpForce: 1050,
        dashForce: 1600,
        doubleJumps: 1,
        abilityCooldowns: {
            1: 6,
            2: 12
        },
        abilityDamage: {
            1: 35,
            2: 55
        }
    }
}

const CharacterAnimations = {
    Erik: {
        idle: new _Animation(Sprites.Characters.Erik.idle, 1),
        run: new _Animation(Sprites.Characters.Erik.run),
        jump: new _Animation(Sprites.Characters.Erik.jump),
        fall: new _Animation(Sprites.Characters.Erik.fall),
        dash: new _Animation(Sprites.Characters.Erik.dash),
        punch: new _Animation(Sprites.Characters.Erik.punch)
    },

    Savas: {
        idle: new _Animation(Sprites.Characters.Savas.idle, 1),
        run: new _Animation(Sprites.Characters.Savas.run),
        jump: new _Animation(Sprites.Characters.Savas.jump),
        fall: new _Animation(Sprites.Characters.Savas.fall),
        dash: new _Animation(Sprites.Characters.Savas.dash),
        punch: new _Animation(Sprites.Characters.Savas.punch)
    },

    Nythan: {
        idle: new _Animation(Sprites.Characters.Nythan.idle, 1),
        run: new _Animation(Sprites.Characters.Nythan.run),
        jump: new _Animation(Sprites.Characters.Nythan.jump),
        fall: new _Animation(Sprites.Characters.Nythan.fall),
        dash: new _Animation(Sprites.Characters.Nythan.dash),
        punch: new _Animation(Sprites.Characters.Nythan.punch)
    },

    Eryx: {
        idle: new _Animation(Sprites.Characters.Eryx.idle, 1),
        run: new _Animation(Sprites.Characters.Eryx.run),
        jump: new _Animation(Sprites.Characters.Eryx.jump),
        fall: new _Animation(Sprites.Characters.Eryx.fall),
        dash: new _Animation(Sprites.Characters.Eryx.dash),
        punch: new _Animation(Sprites.Characters.Eryx.punch)
    }
}

console.log(CharacterAnimations);

const Player1Tag = "player1";
const Player2Tag = "player2";

const Player1Keybinds = {
    left: KeyCode.KeyA,
    right: KeyCode.KeyD,
    jump: KeyCode.KeyW,
    dash: KeyCode.KeyQ,
    punch: KeyCode.KeyE,
    ability: {
        1: KeyCode.KeyR,
        2: KeyCode.KeyF
    }
}

const Player2Keybinds = {
    left: KeyCode.KeyJ,
    right: KeyCode.KeyL,
    jump: KeyCode.KeyI,
    dash: KeyCode.KeyU,
    punch: KeyCode.KeyO,
    ability: {
        1: KeyCode.KeyP,
        2: KeyCode.SemiColon
    }
}