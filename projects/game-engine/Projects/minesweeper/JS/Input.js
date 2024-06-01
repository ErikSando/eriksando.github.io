Input.KeyDown.AddListener((keyCode) => {
    switch (keyCode) {
        case KeyCode.KeyI:
            TileManager.tileSize++;
            TileManager.UpdateCameraPos();
            break;

        case KeyCode.KeyO:
            TileManager.tileSize--;
            if (TileManager.tileSize < 0) TileManager.tileSize = 0;
            TileManager.UpdateCameraPos();
            break;
    }
});

tileSelected = { x: -1, y: -1 };

Input.Mouse1Down.AddListener((position) => {
    let x = Math.floor((position.x + Game.Camera.position.x) / TileManager.tileSize);
    let y = Math.floor((position.y + Game.Camera.position.y) / TileManager.tileSize);

    if (x < 0 || y < 0 || x > TileManager.width || y > TileManager.height) return;

    tileSelected.x = x;
    tileSelected.y = y;

    TileManager.tiles[y][x] = TileID.Empty;
});

Input.MouseMove.AddListener((position) => {
    let x = Math.floor((position.x + Game.Camera.position.x) / TileManager.tileSize);
    let y = Math.floor((position.y + Game.Camera.position.y) / TileManager.tileSize);

    if ((x != tileSelected.x || y != tileSelected.y) && tileSelected.x != -1 && tileSelected.y != -1) {
        TileManager.tiles[tileSelected.y][tileSelected.x] = TileID.Tile;
        tileSelected.x = tileSelected.y = -1;
    }
});

Input.Mouse1Up.AddListener((position) => {
    let x = Math.floor((position.x + Game.Camera.position.x) / TileManager.tileSize);
    let y = Math.floor((position.y + Game.Camera.position.y) / TileManager.tileSize);

    if (x < 0 || y < 0 || x > TileManager.width || y > TileManager.height) return;

    tileSelected.x = tileSelected.y = -1;

    TileManager.Reveal(x, y);
});