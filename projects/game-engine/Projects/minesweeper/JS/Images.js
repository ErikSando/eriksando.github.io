const Images = {
    Tile: new Image(),
    Flag: new Image(),
    Bomb: new Image(),
    BombClicked: new Image(),
    Empty: new Image(),
    Number: {
        1: new Image(), 2: new Image(), 3: new Image(), 4: new Image(),
        5: new Image(), 6: new Image(), 7: new Image(), 8: new Image()
    }
}

Images.Tile.src = "Assets/tile.png";
Images.Flag.src = "Assets/flag.png";
Images.Bomb.src = "Assets/bomb.png";
Images.BombClicked.src = "Assets/bomb_clicked.png";
Images.Empty.src = "Assets/empty.png";

for (let number = 1; number <= 8; number++) {
    Images.Number[number].src = "Assets/" + number + ".png";
}