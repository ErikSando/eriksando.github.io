class World {
    level = 1;
    #data = [];
    blocks = [];
    animated_blocks = [];
    fg_blocks = [];

    constructor() {
        this.#Update();
    }

    // #RenderLayer = (delta, ctx, layer) => {
    //     for (let block in this.blocks) {
    //         if (block.layer != layer) continue;

    //         block.Update(delta);
    //         block.Draw(ctx);
    //     }
    // }

    NextLevel() {
        if (!Levels[this.level + 1]) {} // victory

        this.level++;

        this.#Update();
    }

    #Update() {
        this.#data = Levels[this.level];

        for (let y = 0; y < this.#data.length; y++) {
            for (let x = 0; x < this.#data[y].length; x++) {
                let tile = this.#data[y][x];

                if (tile == 0) {
                    let bg_brick = new BG_Brick(Vector(x * Game.tileSize, y * Game.tileSize));

                    this.blocks.push(bg_brick);
                
                } else if (tile == 1) {
                    let brick = new Brick(Vector(x * Game.tileSize, y * Game.tileSize));

                    this.blocks.push(brick);
                    this.fg_blocks.push(brick);
                
                } else if (tile == 2) {
                    let spikes = new Spikes(Vector(x * Game.tileSize + 2, y * Game.tileSize + 20));
                    let bg_brick = new BG_Brick(Vector(x * Game.tileSize, y * Game.tileSize));

                    this.blocks.push(bg_brick);
                    this.blocks.push(spikes);
                    this.fg_blocks.push(spikes);

                } else if (tile == 3) {
                    let lava = new Lava(Vector(x * Game.tileSize, y * Game.tileSize + 24));
                    let bg_brick = new BG_Brick(Vector(x * Game.tileSize, y * Game.tileSize));

                    this.blocks.push(bg_brick);
                    this.animated_blocks.push(lava);
                    this.fg_blocks.push(lava);
                
                } else if (tile == 4) {
                    let torch = new Torch(Vector(x * Game.tileSize + 24, y * Game.tileSize));
                    let bg_brick = new BG_Brick(Vector(x * Game.tileSize, y * Game.tileSize));

                    this.blocks.push(bg_brick);
                    this.animated_blocks.push(torch);
                
                } else if (tile == 6) {
                    let portal = new Portal(Vector(x * Game.tileSize, y * Game.tileSize - Game.tileSize));

                    this.blocks.push(portal);
                    this.fg_blocks.push(portal);
                }
            }
        }

        Game.Camera.position.y = Levels[this.level].length * Game.tileSize - window.innerHeight;
    }

    Draw(ctx, delta) {
        // for (let layer = 0; layer++; layer < 3) {
        //     this.#RenderLayer(delta, ctx, layer);
        // }
    
        for (let block of this.blocks) {
            block.Draw(ctx);
        }
        
        for (let block of this.animated_blocks) {
            block.Update(delta);
            block.Draw(ctx);
        }
    }
}