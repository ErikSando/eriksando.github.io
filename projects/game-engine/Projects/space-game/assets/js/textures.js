const playerSpritesheet = new Image();
playerSpritesheet.src = "assets/textures/ship/player.png";

const enemySpritesheet = new Image();
enemySpritesheet.src = "assets/textures/ship/enemy.png";

const Textures = {
    background: new Image(),
    player: LoadSpritesheet(playerSpritesheet, new Vector(26, 36), 4),
    enemy: LoadSpritesheet(enemySpritesheet, new Vector(26, 36), 4)
}

Textures.background.src = "assets/textures/bg.png";