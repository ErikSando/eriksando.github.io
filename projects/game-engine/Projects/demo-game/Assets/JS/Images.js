const Images = {
    player: {
        left: {
            idle: [ new Image(), new Image() ],
            run: [ new Image(), new Image(), new Image(), new Image(), new Image() ],
            jump: [ new Image() ],
            fall: [ new Image(), new Image() ]
        },

        right: {
            idle: [ new Image(), new Image() ],
            run: [ new Image(), new Image(), new Image(), new Image(), new Image() ],
            jump: [ new Image() ],
            fall: [ new Image(), new Image() ]
        }
    }
}

for (let direction in Images.player) {
    for (let animation in Images.player[direction]) {
        for (let i = 0; i < Images.player[direction][animation].length; i++) {
            Images.player[direction][animation][i].src = "Assets/textures/player/" + direction + " " + animation + " " + (i + 1) + ".png";
        }
    }
}