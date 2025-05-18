const FPS = new TextLabel(new Vector(10, 10), new Vector(100, 50), "... FPS");
FPS.textAlignX = TextAlignX.Left;
FPS.textAlignY = TextAlignY.Top;
FPS.textStrokeOpacity = 1;
FPS.textStrokeThickness = 3;

const Toggle = new TextButton(new Vector(910, 1000), new Vector(100, 50), "Play");
Toggle.bgColour = "rgb(0, 100, 80)";
Toggle.outlineColour = "rgb(0, 80, 60)";
Toggle.outlineThickness = 4;

Toggle.Mouse1Down.AddListener(() => {
    CellHandler.paused = !CellHandler.paused;
    Toggle.text = CellHandler.paused ? "Play" : "Pause";
});

Game.PostUpdate.AddListener(() => {
    FPS.text = Game.GetFPS() + " FPS";
});

Game.scene = new Scene([], [FPS, Toggle]);

Game.Settings.BackgroundColour = "black";
Game.Settings.MaximumDelta = 10; // Prevent skipping frames

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});