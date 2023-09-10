const Spritesheets = {
    Characters: {
        Erik: {
            left: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() },
            right: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() }
        },

        Savas: {
            left: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() },
            right: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() }
        },

        Nythan: {
            left: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() },
            right: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() }
        },

        Eryx: {
            left: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() },
            right: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() }
        }
    },
    
    Attacks: {
        Slash: new Image(),
        KiBlast: new Image()
    }
}

for (let character in Spritesheets.Characters) {
    for (let direction in Spritesheets.Characters[character]) {
        for (let animation in Spritesheets.Characters[character][direction]) {
            //spritesheets.Characters[character][direction][animation].src = "Assets/Sprites/" + Characters + "/" + left + animation + ".png";
        }
    }
}

for (let attack in Spritesheets.Attacks) {
    Spritesheets.Attacks[attack].src = "Assets/Sprites/Attacks/" + attack + ".png";
}

const Sprites = {
    World: {
        ground: new Image(),
        background: new Image()
    },

    Characters: {
        Erik: {
            left: {
                // idle: LoadSpritesheet(),
                // dash: LoadSpritesheet(),
                // run: LoadSpritesheet(),
                // jump: LoadSpritesheet(),
                // fall: LoadSpritesheet()
            },

            right: {
                // idle: LoadSpritesheet(),
                // dash: LoadSpritesheet(),
                // run: LoadSpritesheet(),
                // jump: LoadSpritesheet(),
                // fall: LoadSpritesheet()
            }
        },

        Savas: {
            left: {
                // idle: LoadSpritesheet(),
                // dash: LoadSpritesheet(),
                // run: LoadSpritesheet(),
                // jump: LoadSpritesheet(),
                // fall: LoadSpritesheet()
            },

            right: {
                // idle: LoadSpritesheet(),
                // dash: LoadSpritesheet(),
                // run: LoadSpritesheet(),
                // jump: LoadSpritesheet(),
                // fall: LoadSpritesheet()
            }
        },

        Nythan: {
            left: {
                // idle: LoadSpritesheet(),
                // dash: LoadSpritesheet(),
                // run: LoadSpritesheet(),
                // jump: LoadSpritesheet(),
                // fall: LoadSpritesheet()
            },

            right: {
                // idle: LoadSpritesheet(),
                // dash: LoadSpritesheet(),
                // run: LoadSpritesheet(),
                // jump: LoadSpritesheet(),
                // fall: LoadSpritesheet()
            }
        },

        Eryx: {
            left: {
                // idle: LoadSpritesheet(),
                // dash: LoadSpritesheet(),
                // run: LoadSpritesheet(),
                // jump: LoadSpritesheet(),
                // fall: LoadSpritesheet()
            },

            right: {
                // idle: LoadSpritesheet(),
                // dash: LoadSpritesheet(),
                // run: LoadSpritesheet(),
                // jump: LoadSpritesheet(),
                // fall: LoadSpritesheet()
            }
        }
    },

    Icons: {
        Erik: {
            left: new Image(),
            right: new Image()
        },

        Savas: {
            left: new Image(),
            right: new Image()
        },

        Nythan: {
            left: new Image(),
            right: new Image()
        },

        Eryx: {
            left: new Image(),
            right: new Image()
        },
    },

    Attacks: {
        Slash: LoadSpritesheet(Spritesheets.Attacks.Slash, new Vector(64, 64), 4, 3, 11),
        KiBall: new Image(),
        KiBlast: LoadSpritesheet(Spritesheets.Attacks.KiBlast, new Vector(48, 48), 3, 2),
        //EnergyBeam: LoadSpritesheet(),
        FlyingSlash: new Image(),

    }
}

for (let character in Sprites.Icons) {
    for (let direction in Sprites.Icons[character]) {
        Sprites.Icons[character][direction].src = "Assets/Sprites/" + character + "/" + direction + "icon.png";
    }
}

for (let attack in Sprites.Attacks) {
    if (!(Sprites.Attacks[attack] instanceof Image)) continue;

    Sprites.Attacks[attack].src = "Assets/Sprites/Attacks/" + attack + ".png";
}