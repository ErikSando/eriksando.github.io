Game.Settings.CanvasResizeType = CanvasResizeType.Fullscreen;

const ground = new GameObject(new Vector(100, 880), new Vector(980, 100), true);

Game.scene = new Scene([ground]);

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});