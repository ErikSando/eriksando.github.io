// Load images
let dirtImg = new Image();
let grassImg = new Image();
let enemyImg = new Image();
let lavaImg = new Image();
let coinImg = new Image();
let portalImg = new Image();
dirtImg.src = 'assets/dirt.png';
grassImg.src = 'assets/grass.png';
enemyImg.src = 'assets/enemy.png';
lavaImg.src = 'assets/lava.png'
coinImg.src = 'assets/coin.png';
portalImg.src = 'assets/portal.png';

class World {
    constructor(data) {
        this.load(data);
    }

    load(data) {
        this.tiles = [];

        let x = 0;
        let y = 0;

        if (!data.length) return;

        for (let i = 0; i < data.length; i++) {
            x = 0;

            for (let j = 0; j < data[i].length; j++) {
                let tile = 0;

                if (data[i][j] == 1) {
                    tile = new Dirt(x * tileSize, y * tileSize, tileSize, tileSize, dirtImg);
                    this.tiles.push(dirt);

                } else if (data[i][j] == 2) {
                    tile = new Grass(x * tileSize, y * tileSize, tileSize, tileSize, grassImg);
                    this.tiles.push(grass);

                } else if (data[i][j] == 3) {
                    tile = new StaticEnemy(x * tileSize, y * tileSize + tileSize / 2.66, tileSize, tileSize / 1.6, enemyImg);
                    this.tiles.push(enemy);

                } else if (data[i][j] == 4) {
                    tile = new Enemy(x * tileSize, y * tileSize + tileSize / 2.66, tileSize, tileSize / 1.6, enemyImg);
                    this.tiles.push(enemy);
                
                } else if (data[i][j] == 5) {
                    tile = new Lava(x * tileSize, y * tileSize + tileSize / 2.66, tileSize, tileSize / 1.6, lavaImg);
                    this.tiles.push(lava);

                } else if (data[i][j] == 6) {
                    tile = new Coin(x * tileSize + tileSize / 8, y * tileSize + tileSize / 8, tileSize / 1.33, tileSize / 1.33, coinImg);
                    this.tiles.push(coin);

                } else if (data[i][j] == 7) {
                    tile = new Portal(x * tileSize, y * tileSize  - tileSize * 2 / 2, tileSize, tileSize * 2, portalImg);
                    this.tiles.push(portal);
                }

                this.tiles.push(tile);

                x++;
            }

            y++;
        }
    }

    draw() {
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i] == 0) return;
            
            this.tiles[i].draw();
        }
    }
}