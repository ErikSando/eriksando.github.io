const TileID = {
    Tile: 0,
    Bomb: 9,
    BombClicked: 10,
    Empty: 11
}

const TileManager = new class {
    bombs = [];
    tiles = [];
    tileSize = 32;

    width = 30;
    height = 16;
    bombCount = 99;

    #gameStarted = false;

    Init() {
        this.#GenerateEmptyField();
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

        if (this.bombs[y][x]) {
            this.tiles[y][x] = TileID.BombClicked;

            for (let j = 0; j < this.height; j++) {
                for (let i = 0; i < this.width; i++) {
                    if (j == y && i == x) continue;

                    if (this.bombs[j][i]) {
                        this.tiles[j][i] = TileID.Bomb;
                    }
                    else {
                        this.tiles[j][i] = TileID.Empty;
                    }
                }
            }
        }
        else {
            this.tiles[y][x] = TileID.Empty;
        }
    }

    #GenerateEmptyField = (width = this.width, height = this.height) => {
        this.width = width;
        this.height = height;

        this.bombs = new Array(height);

        for (let j = 0; j < height; j++) {
            this.bombs[j] = new Array(width);
            this.tiles[j] = new Array(width);

            for (let i = 0; i < width; i++) {
                this.bombs[j][i] = 0;
                this.tiles[j][i] = 0;
            }
        }

        this.UpdateCameraPos();
    }

    GenerateField(width = this.width, height = this.height, startX, startY) {
        this.#GenerateEmptyField(width, height);

        let bombChance = width * height / this.bombCount * 4;
        let bombs = 0;

        while (bombs < this.bombCount) {
            for (let j = 0; j < height; j++) {
                for (let i = 0; i < width; i++) {
                    if (i == startX && j == startY) continue;

                    if (Random.Integer(1, bombChance) == 1) {
                        this.bombs[j][i] = 1;
                        bombs++;
                    }

                    if (bombs >= this.bombCount) break;
                }
            }
        }
    }

    Draw() {
        let ctx = Game.ctx;

        let width = this.width * this.tileSize;
        let height = this.height * this.tileSize;
    
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                let tile = this.tiles[i][j];
                let image = Images.Tile;

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

                ctx.drawImage(image, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
}