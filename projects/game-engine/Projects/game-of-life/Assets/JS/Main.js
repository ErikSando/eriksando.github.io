const FPS = new TextLabel(new Vector(10, 10), new Vector(100, 50), "... FPS");
FPS.textAlignX = TextAlignX.Left;
FPS.textAlignY = TextAlignY.Top;
FPS.textStrokeOpacity = 1;
FPS.textStrokeThickness = 3;

const Toggle = new TextButton(new Vector(880, 1000), new Vector(160, 50), "Play/Pause");
Toggle.bgColour = "rgb(0, 100, 80)";
Toggle.outlineColour = "rgb(0, 80, 60)";
Toggle.outlineThickness = 4;

Toggle.Mouse1Down.AddListener(() => {
    CellHandler.paused = !CellHandler.paused;
});

Game.PostUpdate.AddListener(() => {
    FPS.text = Game.GetFPS() + " FPS";
});

Game.scene = new Scene([], [FPS, Toggle]);

Game.Settings.BackgroundColour = "black";

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});