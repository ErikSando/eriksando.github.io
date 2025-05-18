// Runs once the engine is finished setting up

const scene = new Scene([], UIObjects, [], null, "rgb(20, 40, 80)");
Game.scene = scene;

Game.Settings.ImageSmoothingEnabled = false;

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();

    TileManager.Init();
});

Game.PreDraw.AddListener(() => {
    TileManager.Draw();
});