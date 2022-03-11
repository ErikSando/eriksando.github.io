const Sprites = {
    dirt: new Image(),
    grass: new Image(),
    stone: new Image()
}

Sprites.dirt.src = 'assets/sprites/dirt.png';
Sprites.grass.src = 'assets/sprites/grass.png';
Sprites.stone.src = 'assets/sprites/stone.png';

class World {
    constructor(data) {
        this.tiles = [];

        let x;
        let y = -15//-(Math.floor(data.length / 2)) * tileSize;

        for (let i = 0; i < data.length; i++) {
            x = -Math.floor(worldLength / 2) + Math.floor(canvas.width / tileSize / 2);

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] == 1) {
                    let tile = new Dirt(x * tileSize, y * tileSize, tileSize, tileSize, Sprites.dirt, 'dirt');
                    this.tiles.push(tile);

                } else if (data[i][j] == 2) {
                    let tile = new Grass(x * tileSize, y * tileSize, tileSize, tileSize, Sprites.grass, 'grass');
                    this.tiles.push(tile);
                
                } else if (data[i][j] == 3) {
                    let tile = new Stone(x * tileSize, y * tileSize, tileSize, tileSize, Sprites.stone, 'stone');
                    this.tiles.push(tile);
                }

                x++;
            }

            y++;
        }
    }

    draw() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw();
        }
    }
}