class World {
    #data = [];
    tiles = [];

    constructor(data) {
        this.#data = data;

        this.Reload(data);
    }

    Reload(data = this.#data) {
        this.#data = data;


    }

    AddTile(tile) {
        if (tile instanceof Tile) this.tiles.push(tile);
    }

    RemoveTile(tile) {
        let index = this.tiles.indexOf(tile);

        if (this.tiles[index]) this.tiles.splice(index, 1);
    }
}