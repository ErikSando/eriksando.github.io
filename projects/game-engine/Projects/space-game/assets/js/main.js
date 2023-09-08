const WorldSize = new Vector(3000, 3000);
const World = new Scene();
const player = new Player(new Vector(WorldSize.x / 2 - 52, WorldSize.y / 2 - 72));

Game.LoadScene(World);

Game.Loaded.AddListener(() => {
    Game.Settings.BackgroundImage = Textures.background;

    Game.CreateCanvas();
    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    Game.Camera.position = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.Settings.BackgroundImageStart = new Vector(Game.Camera.position.x, Game.Camera.position.y);
});