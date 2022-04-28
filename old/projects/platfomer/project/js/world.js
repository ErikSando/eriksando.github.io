// Load images
let dirtImg = new Image();
let grassImg = new Image();
let enemyImg = new Image();
let lavaImg = new Image();
let coinImg = new Image();
let portalImg = new Image();
dirtImg.src = 'assets/sprites/dirt.png';
grassImg.src = 'assets/sprites/grass.png';
enemyImg.src = 'assets/sprites/enemy.png';
lavaImg.src = 'assets/sprites/lava.png'
coinImg.src = 'assets/sprites/coin.png';
portalImg.src = 'assets/sprites/portal.png';

class World {
    constructor(data, level) {
        this.tiles = [];
        this.level = level;

        let x = 0;
        let y = 1;

        for (let i = 0; i < data.length; i++) {
            x = 0;

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] == 1) {
                    let dirt = [new Dirt(x * tileSize, y * tileSize, tileSize, tileSize, dirtImg), 'dirt'];
                    this.tiles.push(dirt);

                } else if (data[i][j] == 2) {
                    let grass = [new Grass(x * tileSize, y * tileSize, tileSize, tileSize, grassImg), 'grass'];
                    this.tiles.push(grass);

                } else if (data[i][j] == 3) {
                    let enemy = [new StaticEnemy(x * tileSize, y * tileSize + tileSize / 2.66, tileSize, tileSize / 1.6, enemyImg), 'enemy'];
                    this.tiles.push(enemy);

                } else if (data[i][j] == 4) {
                    let enemy = [new Enemy(x * tileSize, y * tileSize + tileSize / 2.66, tileSize, tileSize / 1.6, enemyImg), 'enemy'];
                    this.tiles.push(enemy);
                
                } else if (data[i][j] == 5) {
                    let lava = [new Lava(x * tileSize, y * tileSize + tileSize / 2.66, tileSize, tileSize / 1.6, lavaImg), 'lava'];
                    this.tiles.push(lava);

                } else if (data[i][j] == 6) {
                    let coin = [new Coin(x * tileSize + tileSize / 8, y * tileSize + tileSize / 8, tileSize / 1.33, tileSize / 1.33, coinImg), 'coin'];
                    this.tiles.push(coin);

                } else if (data[i][j] == 7) {
                    let portal = [new Portal(x * tileSize, y * tileSize  - tileSize * 2 / 2, tileSize, tileSize * 2, portalImg), 'portal'];
                    this.tiles.push(portal);
                }

                x++;
            }

            y++;
        }
    }

    draw() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i][0].draw();
        }
    }
}