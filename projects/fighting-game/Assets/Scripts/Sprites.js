const Spritesheets = {
    Characters: {
        Erik: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() },
        Savas: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() },
        Nythan: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() },
        Eryx: { idle: new Image(), run: new Image(), jump: new Image(), fall: new Image(), dash: new Image(), punch: new Image() }
    },
    
    Attacks: {
        Slash: new Image(),
        KiBlast: new Image()
    }
}

for (let character in Spritesheets.Characters) {
    for (let animation in Spritesheets.Characters[character]) {
        Spritesheets.Characters[character][animation].src = "Assets/Sprites/" + character + "/" + animation + ".png";
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
            idle: LoadSpritesheet(Spritesheets.Characters.Erik.idle, new Vector(64, 64), 2, 1),
            dash: LoadSpritesheet(Spritesheets.Characters.Erik.dash),
            run: LoadSpritesheet(Spritesheets.Characters.Erik.run, new Vector(64, 64), 2, 1),
            jump: LoadSpritesheet(Spritesheets.Characters.Erik.jump, new Vector(64, 64), 2, 1),
            fall: LoadSpritesheet(Spritesheets.Characters.Erik.fall, new Vector(64, 64), 2, 1),
            punch: LoadSpritesheet(Spritesheets.Characters.Erik.punch, new Vector(64, 64), 2, 1)
        },

        Savas: {
            idle: LoadSpritesheet(Spritesheets.Characters.Savas.idle, new Vector(64, 64), 2, 1),
            dash: LoadSpritesheet(Spritesheets.Characters.Savas.dash),
            run: LoadSpritesheet(Spritesheets.Characters.Savas.run, new Vector(64, 64), 2, 1),
            jump: LoadSpritesheet(Spritesheets.Characters.Savas.jump, new Vector(64, 64), 2, 1),
            fall: LoadSpritesheet(Spritesheets.Characters.Savas.fall, new Vector(64, 64), 2, 1),
            punch: LoadSpritesheet(Spritesheets.Characters.Savas.punch, new Vector(64, 64), 2, 1)
        },

        Nythan: {
            idle: LoadSpritesheet(Spritesheets.Characters.Nythan.idle, new Vector(64, 64), 2, 1),
            dash: LoadSpritesheet(Spritesheets.Characters.Nythan.dash),
            run: LoadSpritesheet(Spritesheets.Characters.Nythan.run, new Vector(64, 64), 2, 1),
            jump: LoadSpritesheet(Spritesheets.Characters.Nythan.jump, new Vector(64, 64), 2, 1),
            fall: LoadSpritesheet(Spritesheets.Characters.Nythan.fall, new Vector(64, 64), 2, 1),
            punch: LoadSpritesheet(Spritesheets.Characters.Nythan.punch, new Vector(64, 64), 2, 1)
        },

        Eryx: {
            idle: LoadSpritesheet(Spritesheets.Characters.Eryx.idle, new Vector(64, 64), 2, 1),
            dash: LoadSpritesheet(Spritesheets.Characters.Eryx.dash),
            run: LoadSpritesheet(Spritesheets.Characters.Eryx.run, new Vector(64, 64), 2, 1),
            jump: LoadSpritesheet(Spritesheets.Characters.Eryx.jump, new Vector(64, 64), 2, 1),
            fall: LoadSpritesheet(Spritesheets.Characters.Eryx.fall, new Vector(64, 64), 2, 1),
            punch: LoadSpritesheet(Spritesheets.Characters.Eryx.punch, new Vector(64, 64), 2, 1)
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
        ShockwavePunch: new Image()

    }
}

console.log(Sprites);

for (let character in Sprites.Icons) {
    for (let direction in Sprites.Icons[character]) {
        Sprites.Icons[character][direction].src = "Assets/Sprites/" + character + "/" + direction + "icon.png";
    }
}

for (let attack in Sprites.Attacks) {
    if (!(Sprites.Attacks[attack] instanceof Image)) continue;

    Sprites.Attacks[attack].src = "Assets/Sprites/Attacks/" + attack + ".png";
}