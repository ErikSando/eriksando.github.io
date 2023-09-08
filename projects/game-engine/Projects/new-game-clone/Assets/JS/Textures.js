const Textures = {
    player: {
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
        respawn: new Image()
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