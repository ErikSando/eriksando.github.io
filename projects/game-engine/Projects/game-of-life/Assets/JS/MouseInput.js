let hasMoved = false;

Input.MouseMove.AddListener((newPos, oldPos) => {
    if (!Input.GetMouseButton(1)) return;

    hasMoved = true;

    Game.Camera.position.subtract(newPos.minus(oldPos));
});

Input.MouseWheel.AddListener((direction) => {
    CellHandler.cellSize -= direction / 3;
});

Input.Mouse1Up.AddListener((position) => {
    if (hasMoved) {
        hasMoved = false;
        return;
    }

    let truePosition = position.plus(Game.Camera.position);

    let cellPositionX = Math.floor(truePosition.x / CellHandler.cellSize);
    let cellPositionY = Math.floor(truePosition.y / CellHandler.cellSize);

    CellHandler.ToggleCell(cellPositionX, cellPositionY);
});