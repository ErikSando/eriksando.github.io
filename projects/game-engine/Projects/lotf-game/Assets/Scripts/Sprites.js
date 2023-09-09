const spritesheets = {
    Erik: {
        Left: { idle: new Image(), dash: new Image(), run: new Image(), jump: new Image(), fall: new Image() },
        right: { idle: new Image(), dash: new Image(), run: new Image(), jump: new Image(), fall: new Image() }
    },

    Savas: {
        Left: { idle: new Image(), dash: new Image(), run: new Image(), jump: new Image(), fall: new Image() },
        right: { idle: new Image(), dash: new Image(), run: new Image(), jump: new Image(), fall: new Image() }
    },

    Nythan: {
        Left: { idle: new Image(), dash: new Image(), run: new Image(), jump: new Image(), fall: new Image() },
        right: { idle: new Image(), dash: new Image(), run: new Image(), jump: new Image(), fall: new Image() }
    },

    Eryx: {
        Left: { idle: new Image(), dash: new Image(), run: new Image(), jump: new Image(), fall: new Image() },
        right: { idle: new Image(), dash: new Image(), run: new Image(), jump: new Image(), fall: new Image() }
    }
}

for (let player in spritesheets) {
    for (let direction in spritesheets[player]) {
        for (let animation in spritesheets[player][direction]) {
            //spritesheets[player][direction][animation].src = "Assets/Sprites/" + player + "/" + left + animation + ".png";
        }
    }
}

const Sprites = {
    world: {
        ground: new Image(),
        background: new Image()
    },

    icons: {
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

    players: {
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
    }
}

for (let character in Sprites.icons) {
    for (let direction in Sprites.icons[character]) {
        Sprites.icons[character][direction].src = "Assets/Sprites/" + character + "/" + direction + "icon.png";
    }
}