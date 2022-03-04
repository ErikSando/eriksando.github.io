let movingEnemyImg = new Image();
movingEnemyImg.src = 'assets/enemy.png';

let tiles = {
    // ID: [Class, Width Multiplier, Height Multiplier, X Offset, Y Offset]
    1: [Dirt, 0, 0, 1, 1, dirtImg],
    2: [Grass, 0, 0, 1, 1, grassImg],
    3: [StaticEnemy, 0, tileSize / 4, 1, 0.625, enemyImg],
    4: [Enemy, 0, tileSize / 4, 1, 0.625, movingEnemyImg],
    5: [Lava, 0, tileSize / 4, 1, 0.625, lavaImg],
    6: [Coin, 0, tileSize / 12, 0.75, 0.75, coinImg],
    7: [Portal, 0, -tileSize, 1, 2, portalImg]
}

class TileManager {
    constructor() {
        this.tiles = [];
    }

    addTile() {
        let pos = mousePos;
        pos.x = Math.floor(pos.x / 48);
        pos.y = Math.floor(pos.y / 48);

        if (ID == 8) {
            for (let i = 0; i < world.tiles.length; i++) {
                if (world.tiles[i].x == pos.x * tileSize && world.tiles[i].y == pos.y * tileSize) {
                    world.tiles.splice(i, 1);
                }
            }

            return;
        }

        let tile = new tiles[ID][0](pos.x * tileSize +  tiles[ID][1], pos.y * tileSize +  tiles[ID][2], tileSize * tiles[ID][3], tileSize * tiles[ID][4], tiles[ID][5]);

        for (let i = 0; i < world.tiles.length; i++) {
            if (world.tiles[i].x == pos.x * tileSize && world.tiles[i].y == pos.y * tileSize) {
                world.tiles.splice(i, 1, tile);
            }
        }

        world.tiles.push(tile);
    }
}