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
        strength: 12,
        speed: 700,
        defence: 120,
        jumpForce: 1150,
        dashForce: 2000,
        doubleJumps: 1,
        abilityCooldowns: {
            1: 5,
            2: 12
        },
        abilityDamage: {
            1: 20,
            2: 30
        }
    },

    Savas: {
        strength: 10,
        speed: 550,
        defence: 100,
        jumpForce: 1000,
        dashForce: 1500,
        doubleJumps: 1,
        abilityCooldowns: {
            1: 4,
            2: 10
        },
        abilityDamage: {
            1: 25,
            2: 40
        }
    },

    Nythan: {
        strength: 8,
        speed: 650,
        defence: 80,
        jumpForce: 1100,
        dashForce: 1800,
        doubleJumps: 2,
        abilityCooldowns: {
            1: 7,
            2: 10
        },
        abilityDamage: {
            1: 40, // this ability will be rapid damage, so not all damage is likely to be taken by opponent
            2: 40
        }
    },

    Eryx: {
        strength: 14,
        speed: 600,
        defence: 140,
        jumpForce: 1050,
        dashForce: 1600,
        doubleJumps: 1,
        abilityCooldowns: {
            1: 6,
            2: 12
        },
        abilityDamage: {
            1: 25,
            2: 35
        }
    }
}

const CharacterAnimations = {
    Erik: {
        left: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation(),
            dash: new _Animation(),
            punch: new _Animation()
        },

        right: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation(),
            dash: new _Animation(),
            punch: new _Animation()
        }
    },

    Savas: {
        left: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation(),
            dash: new _Animation(),
            punch: new _Animation()
        },

        right: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation(),
            dash: new _Animation(),
            punch: new _Animation()
        }
    },

    Nythan: {
        left: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation(),
            dash: new _Animation(),
            punch: new _Animation()
        },

        right: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation(),
            dash: new _Animation(),
            punch: new _Animation()
        }
    },

    Eryx: {
        left: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation(),
            dash: new _Animation(),
            punch: new _Animation()
        },

        right: {
            idle: new _Animation(),
            run: new _Animation(),
            jump: new _Animation(),
            fall: new _Animation(),
            dash: new _Animation(),
            punch: new _Animation()
        }
    }
}

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