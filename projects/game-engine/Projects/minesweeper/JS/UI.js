const NewGameButton = new TextButton(new Vector(1090, 970), new Vector(180, 50), "New Game");
NewGameButton.outlineColour = "white";
NewGameButton.outlineThickness = 3;
NewGameButton.bgColour = "rgb(200, 50, 0)";

const ZoomInButton = new TextButton(new Vector(870, 970), new Vector(180, 50), "Zoom In (I)");
ZoomInButton.outlineColour = "white";
ZoomInButton.outlineThickness = 3;
ZoomInButton.bgColour = "rgb(200, 50, 0)";

const ZoomOutButton = new TextButton(new Vector(650, 970), new Vector(180, 50), "Zoom Out (O)");
ZoomOutButton.outlineColour = "white";
ZoomOutButton.outlineThickness = 3;
ZoomOutButton.bgColour = "rgb(200, 50, 0)";

const Info = new TextLabel(new Vector(760, 1035), new Vector(400, 30), "Open console to use commands");

NewGameButton.MouseEnter.AddListener(() => {
    NewGameButton.bgColour = "rgb(180, 45, 0)"
});

NewGameButton.MouseExit.AddListener(() => {
    NewGameButton.bgColour = "rgb(200, 50, 0)";
});

NewGameButton.Mouse1Down.AddListener(() => {
    NewGameButton.bgColour = "rgb(160, 40, 0)";

    TileManager.Init();
});

NewGameButton.Mouse1Up.AddListener(() => {
    NewGameButton.bgColour = "rgb(180, 45, 0)";
});

ZoomInButton.MouseEnter.AddListener(() => {
    ZoomInButton.bgColour = "rgb(180, 45, 0)"
});

ZoomInButton.MouseExit.AddListener(() => {
    ZoomInButton.bgColour = "rgb(200, 50, 0)";
});

ZoomInButton.Mouse1Down.AddListener(() => {
    ZoomInButton.bgColour = "rgb(160, 40, 0)";

    TileManager.tileSize++;
    TileManager.UpdateCameraPos();
});

ZoomInButton.Mouse1Up.AddListener(() => {
    ZoomInButton.bgColour = "rgb(180, 45, 0)";
});

ZoomOutButton.MouseEnter.AddListener(() => {
    ZoomOutButton.bgColour = "rgb(180, 45, 0)"
});

ZoomOutButton.MouseExit.AddListener(() => {
    ZoomOutButton.bgColour = "rgb(200, 50, 0)";
});

ZoomOutButton.Mouse1Down.AddListener(() => {
    ZoomOutButton.bgColour = "rgb(160, 40, 0)";

    TileManager.tileSize--;
    if (TileManager.tileSize < 0) TileManager.tileSize = 0;
    TileManager.UpdateCameraPos();
});

ZoomOutButton.Mouse1Up.AddListener(() => {
    ZoomOutButton.bgColour = "rgb(180, 45, 0)";
});

const UIObjects = [NewGameButton, ZoomInButton, ZoomOutButton, Info];