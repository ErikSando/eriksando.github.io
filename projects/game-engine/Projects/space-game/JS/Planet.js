function CreatePlanetGameObjects(tilemap, info) {
    let gameObjects = [];

    for (let y = 0; y < tilemap.length; y++) {
        for (let x = 0; x < tilemap[y].length; x++) {
            let tile = tilemap[y][x];

            if (!(tile in info.BlockInfo)) continue;

            let blockInfo = info.BlockInfo[tile];

            let block = new GameObject(new Vector(x * info.BlockSize, y * info.BlockSize), new Vector(info.BlockSize, info.BlockSize), blockInfo.anchored || true);
            
            if (blockInfo.hasAnim) block.animation = blockInfo.animation.Copy();
            else block.image = blockInfo.image;

            gameObjects.push(block);
        }
    }

    return gameObjects;
}

function CreatePlanetScene(info, tilemap = [], UIObjects = []) {
    return new Scene(CreatePlanetGameObjects(tilemap, info), UIObjects, [], info.BackgroundImage, info.BackgroundColour, info.Gravity);
}