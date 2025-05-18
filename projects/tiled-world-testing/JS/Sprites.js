const Sprites = {
    blocks: {
        grass: new Image(),
        dirt: new Image(),
        stone: new Image()
    }
}

for (let block in Sprites.blocks) {
    Sprites.blocks[block].src = "Assets/sprites/blocks/" + block + ".png";
}