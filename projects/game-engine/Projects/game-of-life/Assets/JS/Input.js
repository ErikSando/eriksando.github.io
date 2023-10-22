let hasMoved = false;

Input.MouseMove.AddListener((newPos, oldPos) => {
    if (!Input.GetMouseButton(1)) return;

    hasMoved = true;

    Game.Camera.position.subtract(newPos.minus(oldPos));
});

Input.MouseWheel.AddListener((direction) => {
    CellHandler.cellSize -= direction / 2;
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

let digits = [];

for (let i = 1; i <= 9; ++i) {
    digits.push({ keyCode: KeyCode["Digit" + i], key: i });
}

digits.push({ keyCode: KeyCode.Digit0, key: 0 });

let numberString, number;

Input.KeyDown.AddListener(keyCode => {
    console.log(keyCode, Input.GetKey(KeyCode.Digit5));

    switch (keyCode) {
        case KeyCode.KeyP:
            CellHandler.paused = !CellHandler.paused;
            Toggle.text = CellHandler.paused ? "Play" : "Pause";
            break;
        case KeyCode.KeyI:
            if (Input.GetKey(KeyCode.ShiftLeft)) return CellHandler.cellSize += 0.1;
            CellHandler.cellSize += 2;
            break;
        case KeyCode.KeyO:
            if (Input.GetKey(KeyCode.ShiftLeft)) return CellHandler.cellSize -= 0.1;
            CellHandler.cellSize -= 2;
            break;
        case KeyCode.KeyL: CellHandler.drawOutlines = !CellHandler.drawOutlines; break;
        case KeyCode.KeyT:
            numberString = "";

            for (let digit of digits) {
                if (Input.GetKey(digit.keyCode)) numberString += digit.key;
            }

            number = Number(numberString);
            if (!number || isNaN(number) || number < 0) return;

            CellHandler.interval = number / 50;
        break;
        case KeyCode.KeyR: if (Input.GetKey(KeyCode.ShiftLeft)) CellHandler.Reset(); break;
        case KeyCode.KeyG:
            numberString = "";

            for (let digit of digits) {
                if (Input.GetKey(digit.keyCode)) numberString += digit.key;
            }

            number = Number(numberString);
            if (!number || isNaN(number) || number < 0) return;

            GenerateRandomLayout(number);

        break;
        default: break;
    }
});