const Sprites = {
    LocalPlayer: {
        idle: [ new Image() ],
        move: [ new Image(), new Image(), new Image(), new Image() ]
    },

    NonLocalPlayer: {
        idle: [ new Image() ],
        move: [ new Image(), new Image(), new Image(), new Image() ]
    }
}

for (let animation in Sprites.LocalPlayer) {
    for (let i = 0; i < Sprites.LocalPlayer[animation].length; ++i) {
        Sprites.LocalPlayer[animation][i].src = "Assets/local_player/" + animation + "_" + i + ".png";
    }
}

for (let animation in Sprites.NonLocalPlayer) {
    for (let i = 0; i < Sprites.NonLocalPlayer[animation].length; ++i) {
        Sprites.NonLocalPlayer[animation][i].src = "Assets/non_local_player/" + animation + "_" + i + ".png";
    }
}