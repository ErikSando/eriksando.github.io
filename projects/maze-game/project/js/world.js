class World {
    constructor(data, level) {
        this.level = level;
        this.tiles = [];

        let x = 0;
        let y = 0;

        for (let i = 0; i < data.length; i++) {
            x = 0;
            
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] == 1) {
                    let tile = [new Tile(x, y, 1, 1), 'tile'];
                    this.tiles.push(tile);

                } else if (data[i][j] == 2) {
                    let tile = [new Tile(x, y, 0.75, 1), 'tile'];
                    this.tiles.push(tile);

                } else if (data[i][j] == 3) {
                    let tile = [new Tile(x, y, 0.5, 1), 'tile'];
                    this.tiles.push(tile);

                } else if (data[i][j] == 4) {
                    let tile = [new Tile(x, y, 0.25, 1), 'tile'];
                    this.tiles.push(tile);

                } else if (data[i][j] == 5) {
                    let tile = [new Tile(x, y, 1, 0.75), 'tile'];
                    this.tiles.push(tile);

                } else if (data[i][j] == 6) {
                    let tile = [new Tile(x, y, 1, 0.5), 'tile'];
                    this.tiles.push(tile);

                } else if (data[i][j] == 7) {
                    let tile = [new Tile(x, y, 1, 0.25), 'tile'];
                    this.tiles.push(tile);

                } else if (data[i][j] == 8) {
                    let tile = [new Finish(x, y, 1, 0.25), 'finish'];
                    this.tiles.push(tile);
                }
                
                x++;
            }

            y++;
        }
    }

    draw(colour) {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i][0].draw(colour);
        }
    }
}