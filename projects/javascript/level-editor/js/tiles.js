let movingEnemyImg = new Image();
movingEnemyImg.src = 'assets/enemy.png';

let tiles = {
    // ID: [Class, Width Multiplier, Height Multiplier, X Offset, Y Offset]
    1: [Dirt, 0, 0, 1, 1, dirtImg],
    2: [Grass, 0, 0, 1, 1, grassImg],
    3: [StaticEnemy, 0, tileSize / 3 + 1, 1, 0.625, enemyImg],
    4: [Enemy, 0, tileSize / 3 + 1, 1, 0.625, movingEnemyImg],
    5: [Lava, 0, tileSize / 3 + 1, 1, 0.625, lavaImg],
    6: [Coin, tileSize / 8, tileSize / 8, 0.75, 0.75, coinImg],
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
            let deleteRect = {
                x: pos.x * tileSize,
                y: pos.y * tileSize,
                w: tileSize,
                h: tileSize
            }
            
            for (let i = 0; i < world.tiles.length; i++) {
                let tempRect = {
                    x: world.tiles[i].x,
                    y: world.tiles[i].y,
                    w: world.tiles[i].w,
                    h: world.tiles[i].h,
                }
                
                if (rectIntersection(deleteRect, tempRect)) {
                    world.tiles.splice(i, 1);
                }
            }

            return;
        }

        let tile = new tiles[ID][0](pos.x * tileSize +  tiles[ID][1], pos.y * tileSize +  tiles[ID][2], tileSize * tiles[ID][3], tileSize * tiles[ID][4], tiles[ID][5]);
        let tileRect = {
            x: pos.x * tileSize,
            y: pos.y * tileSize,
            w: tileSize,
            h: tileSize
        }
        
        for (let i = 0; i < world.tiles.length; i++) {
            let tempRect = {
                x: world.tiles[i].x,
                y: world.tiles[i].y,
                w: world.tiles[i].w,
                h: world.tiles[i].h,
            }

            if (rectIntersection(tileRect, tempRect)) {
                return world.tiles.splice(i, 1, tile);
            }
        }

        world.tiles.push(tile);
    }
}