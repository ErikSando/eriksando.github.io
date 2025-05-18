const Spritesheets = {
    blocks: {
        test: new Image()
    }
}

for (let category in Spritesheets) {
    for (let spritesheet in Spritesheets[category]) {
        Spritesheets[category][spritesheet].src = "Assets/images/" + category + "/" + spritesheet + ".png";
    }
}

const Assets = {
    Images: {
        blocks: {
            dirt: new Image(),
            grass: new Image(),
            stone: new Image(),
        }
    },

    Animations: {
        blocks: {
            test: LoadSpritesheetAnimation(Spritesheets.blocks.test, new AnimationInfo(3), new Vector(16, 16), 3)
        }
    },

    Sounds: {

    }
}

for (let category in Assets.Images) {
    for (let member in Assets.Images[category]) {
        Assets.Images[category][member].src = "Assets/images/" + category + "/" + member + ".png";
    }
}