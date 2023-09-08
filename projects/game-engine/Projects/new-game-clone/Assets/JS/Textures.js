const playerSpritesheet = new Image();
playerSpritesheet.src = "Assets/Textures/player/spritesheet.png";

const Textures = {
    player: {
        left: {
            idle: LoadSpritesheet(playerSpritesheet, new Vector(13, 32)),
            run: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 4, 1, new Vector(26, 0)),
            inair: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 1, 1, new Vector(13, 0))
        },

        right: {
            idle: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 1, 1, new Vector(0, 32)),
            run: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 4, 1, new Vector(26, 32)),
            inair: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 1, 1, new Vector(13, 32))
        }
    },

    blocks: {
        bg_brick: new Image(),
        brick: new Image(),
        spikes: new Image(),
        lava: [ new Image(), new Image() ],
        torch: [ new Image(), new Image() ],
        portal: new Image()
    },

    UI: {
        start: new Image(),
        respawn: new Image(),
        left: new Image(),
        right: new Image(),
        up: new Image()
    }
}

for (let block in Textures.blocks) {
    if (Textures.blocks[block] instanceof Image) {
        Textures.blocks[block].src = "Assets/Textures/blocks/" + block + ".png";
        continue;
    }

    for (let i = 0; i < Textures.blocks[block].length; i++) {
        Textures.blocks[block][i].src = "Assets/Textures/blocks/" + block + "_" + i + ".png";
    }
}

for (let uiObject in Textures.UI) {
    Textures.UI[uiObject].src = "Assets/Textures/UI/" + uiObject + ".png";
}