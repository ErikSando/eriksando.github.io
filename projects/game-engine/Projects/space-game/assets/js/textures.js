const playerSpritesheet = new Image();
playerSpritesheet.src = "assets/textures/ships/player.png";

const enemySpritesheet = new Image();
enemySpritesheet.src = "assets/textures/ships/enemy.png";

const explosionSpriteSheet = new Image();
explosionSpriteSheet.src = "assets/textures/explosion.png";

const Textures = {
    background: new Image(),
    player: LoadSpritesheet(playerSpritesheet, new Vector(26, 36), 4),
    enemy: LoadSpritesheet(enemySpritesheet, new Vector(26, 36), 4),
    explosion: LoadSpritesheet(explosionSpriteSheet, new Vector(40, 40), 3, 3)
}

Textures.background.src = "assets/textures/bg.png";