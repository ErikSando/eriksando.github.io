const TileID = {
    Tile: 0,
    Bomb: 9,
    BombClicked: 10,
    Empty: 11
}

const TileManager = new class {
    bombs = [];
    tiles = [];
    revealed = [];
    tileSize = 32;

    width = 30;
    height = 16;
    bombCount = 99;

    #gameStarted = false;

    Init() {
        this.GenerateField();
    }

    UpdateCameraPos() {
        Game.Camera.position.x = (this.width * this.tileSize - Game.ViewPort.width) / 2;
        Game.Camera.position.y = (this.height * this.tileSize - Game.ViewPort.height) / 2 + 55;
    }

    SetWidth(width) {
        this.#GenerateEmptyField(width || this.width, this.height);
    }

    SetHeight(height) {
        this.#GenerateEmptyField(this.width, height || this.height);
    }

    Reveal(x, y) {
        if (!this.#gameStarted) {
            this.#gameStarted = true;

            this.GenerateField(this.width, this.height, x, y);
        }

        this.revealed[y][x] = 1;

        if (this.bombs[y][x]) {
            this.tiles[y][x] = TileID.BombClicked;

            for (let j = 0; j < this.height; j++) {
                for (let i = 0; i < this.width; i++) {
                    if (j == y && i == x) continue;

                    this.revealed[j][i] = 1;

                    if (this.bombs[j][i]) {
                        this.tiles[j][i] = TileID.Bomb;
                    }
                    else {
                        //this.tiles[j][i] = TileID.Empty;
                    }
                }
            }
        }
        // else {
        //     this.tiles[y][x] = TileID.Empty;
        // }
    }

    #GenerateEmptyField = (width, height) => {
        this.width = width;
        this.height = height;

        this.bombs = new Array(height);
        this.tiles = new Array(height);
        this.revealed = new Array(height);

        for (let j = 0; j < height; j++) {
            this.bombs[j] = new Array(width);
            this.tiles[j] = new Array(width);
            this.revealed[j] = new Array(width);

            for (let i = 0; i < width; i++) {
                this.bombs[j][i] = 0;
                this.tiles[j][i] = 0;
                this.revealed[j][i] = 0;
            }
        }

        this.UpdateCameraPos();
    }

    #GenerateBombs(width, height) {
        let bombLocations = []
        let bombs = 0

        while (bombs < this.bombCount) {
            let location = [ Random.Integer(0, height - 1), Random.Integer(0, width - 1) ]
            if (bombLocations.includes(location)) continue;
            bombLocations.push(location);
            bombs++;

            this.bombs[location[0]][location[1]] = 1;
        }
    }

    #GenerateNumbers(width, height) {
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                if (this.bombs[j][i]) continue;

                let bombCount = 0;
                let adjacentTiles = []

                let above = [ j - 1, i ]
                let below = [ j + 1, i ]
                let left  = [ j, i - 1 ]
                let right = [ j, i + 1 ]

                if (j > 0)          adjacentTiles.push(above); // above
                if (j < height - 1) adjacentTiles.push(below); // below
                if (i > 0)          adjacentTiles.push(left); // left
                if (i < width - 1)  adjacentTiles.push(right); // right

                if (adjacentTiles.includes(above) && adjacentTiles.includes(left)) adjacentTiles.push([ j - 1, i - 1 ]);
                if (adjacentTiles.includes(above) && adjacentTiles.includes(right)) adjacentTiles.push([ j - 1, i + 1 ]);
                if (adjacentTiles.includes(below) && adjacentTiles.includes(left)) adjacentTiles.push([ j + 1, i - 1 ]);
                if (adjacentTiles.includes(below) && adjacentTiles.includes(right)) adjacentTiles.push([ j + 1, i + 1 ]);
            
                console.log(adjacentTiles)

                for (let tile of adjacentTiles) {
                    if (this.bombs[tile[0]][tile[1]]) bombCount++;
                }

                this.tiles[j][i] = bombCount;
            }
        }
    }

    GenerateField(width = this.width, height = this.height, startX, startY) {
        this.#GenerateEmptyField(width, height);
        this.#GenerateBombs(width, height);
        this.#GenerateNumbers(width, height);
    }

    Draw() {
        let ctx = Game.ctx;

        let width = this.width * this.tileSize;
        let height = this.height * this.tileSize;
    
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                let tile = this.tiles[i][j];
                let image = Images.Tile;

                if (this.revealed[i][j]) {
                    switch (tile) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            image = Images.Number[tile];
                            break;

                        case TileID.Bomb:
                            image = Images.Bomb;
                            break;
                        
                        case TileID.BombClicked:
                            image = Images.BombClicked;
                            break;

                        case TileID.Empty:
                            image = Images.Empty;
                            break;
                    }
                }

                ctx.drawImage(image, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
}