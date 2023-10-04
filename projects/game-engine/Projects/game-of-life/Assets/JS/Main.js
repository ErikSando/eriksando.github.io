const FPS = new TextLabel(new Vector(10, 10), new Vector(150, 50), "... FPS");
FPS.textAlignX = TextAlignX.Left;
FPS.textAlignY = TextAlignY.Top;
FPS.textStrokeOpacity = 1;
FPS.textStrokeThickness = 3;

const Toggle = new TextButton(new Vector(860, 1000), new Vector(200, 50), "Play/Pause");
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

Game.Settings.BackgroundColour = "rgb(110, 120, 130)";

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});