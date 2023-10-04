const worldData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 1],
    [1, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

let FPS = new TextLabel(new Vector(10, 10), new Vector(150, 50), "... FPS");
FPS.textSize = 35;
FPS.textAlignX = TextAlignX.Left;
FPS.textAlignY = TextAlignY.Top;
FPS.textColour = "black";

let CameraControls = new TextLabel(new Vector(10, 1040), new Vector(350, 30), "Arrow L/R: Rotate Camera");
CameraControls.textAlignX = TextAlignX.Left;
CameraControls.textAlignY = TextAlignY.Bottom;

let MoveControls = new TextLabel(new Vector(10, 1000), new Vector(350, 30), "WASD: Move");
MoveControls.textAlignX = TextAlignX.Left;
MoveControls.textAlignY = TextAlignY.Bottom;

Game.PostUpdate.AddListener(() => {
    FPS.text = Math.round(Game.FPS) + " FPS";
});

Game.scene = LoadTilemap(worldData, 50);
Game.scene.AddUI(FPS, CameraControls, MoveControls);

Game.Settings.BackgroundColour = "rgb(200, 220, 240)";

const player = new Player(new Vector3(180, 220, 0));

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});