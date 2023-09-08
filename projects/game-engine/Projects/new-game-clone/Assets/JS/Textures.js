const playerSpritesheet = new Image();
playerSpritesheet.src = "Assets/Textures/player/spritesheet.png";

const Textures = {
    player: {
        // It seems that the canvas cannot acurratly draw offseted images
        // left: {
        //     idle: LoadSpritesheet(playerSpritesheet, new Vector(13, 32)),
        //     run: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 4, 1, new Vector(26, 0)),
        //     inair: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 1, 1, new Vector(13, 0))
        // },

        // right: {
        //     idle: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 1, 1, new Vector(0, 32)),
        //     run: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 4, 1, new Vector(26, 32)),
        //     inair: LoadSpritesheet(playerSpritesheet, new Vector(13, 32), 1, 1, new Vector(13, 32))
        // }

        left: {
            idle: [ new Image() ],
            run: [ new Image(), new Image(), new Image(), new Image() ],
            inair: [ new Image() ]
        },

        right: {
            idle: [ new Image() ],
            run: [ new Image(), new Image(), new Image(), new Image() ],
            inair: [ new Image() ]
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

for (let direction in Textures.player) {
    for (let animation in Textures.player[direction]) {
        for (let i = 0; i < Textures.player[direction][animation].length; i++) {
            Textures.player[direction][animation][i].src = "Assets/Textures/player/" + direction + "_" + animation + "_" + i + ".png";
        }
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