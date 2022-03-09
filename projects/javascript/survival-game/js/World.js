const Sprites = {
    dirt: new Image(),
    grass: new Image()
}

Sprites.dirt.src = 'assets/sprites/dirt.png';
Sprites.grass.src = 'assets/sprites/grass.png';

class World {
    constructor(data) {
        this.tiles = [];

        let x;
        let y = -10//-(Math.floor(data.length / 2)) * tileSize;

        for (let i = 0; i < data.length; i++) {
            x = -Math.floor(worldLength / 2) + Math.floor(canvas.width / tileSize / 2);

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] == 1) {
                    let dirt = new Dirt(x * tileSize, y * tileSize, tileSize, tileSize, Sprites.dirt, 'dirt');
                    this.tiles.push(dirt);

                } else if (data[i][j] == 2) {
                    let grass = new Grass(x * tileSize, y * tileSize, tileSize, tileSize, Sprites.grass, 'grass');
                    this.tiles.push(grass);
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