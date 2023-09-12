const Images = {
    player: {
        left: {
            idle: [ new Image(), new Image(), new Image() ],
            run: [ new Image(), new Image(), new Image(), new Image() ],
            jump: [ new Image() ],
            fall: [ new Image() ]
        },
        
        right: {
            idle: [ new Image(), new Image(), new Image() ],
            run: [ new Image(), new Image(), new Image(), new Image() ],
            jump: [ new Image() ],
            fall: [ new Image() ]
        }
    },

    blocks: {
        grass: new Image(),
        dirt: new Image(),
        stone: new Image(),
        coal: new Image(),
        iron: new Image(),
        sapphire: new Image(),
        bedrock: new Image()
    },

    enemies: {
        zombie: {
            left: {
                idle: [ new Image(), new Image(), new Image() ],
                run: [ new Image(), new Image(), new Image(), new Image() ],
                jump: [ new Image() ],
                fall: [ new Image() ]
            },
            
            right: {
                idle: [ new Image(), new Image(), new Image() ],
                run: [ new Image(), new Image(), new Image(), new Image() ],
                jump: [ new Image() ],
                fall: [ new Image() ]
            }
        }
    },

    UI: {
        inventory: new Image()
    }
}

for (let direction in Images.player) {
    for (let animation in Images.player[direction]) {
        for (let i = 0; i < Images.player[direction][animation].length; i++) {
            Images.player[direction][animation][i].src = "assets/textures/player/" + direction + animation + i + ".png";
        }
    }
}

for (let block in Images.blocks) {
    Images.blocks[block].src = "assets/textures/blocks/" + block + ".png";
}

for (let enemy in Images.enemies) {
    for (let direction in Images.enemies[enemy]) {
        for (let animation in Images.enemies[enemy][direction]) {
            for (let i = 0; i < Images.enemies[enemy][direction][animation].length; i++) {
                Images.enemies[enemy][direction][animation][i].src = "assets/textures/enemies/" + enemy  + "/" + direction + animation + i + ".png";
            }
        }
    }
}

for (let UI in Images.UI) {
    Images.UI[UI].src = "assets/textures/UI/" + UI + ".png";
}