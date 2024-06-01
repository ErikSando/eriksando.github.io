const ground = new GameObject(new Vector(100, 880), new Vector(1720, 100), true);
ground.colour = "white";

const scene = new Scene([/* Game Objects */ ground], [/* UI Objects */]);

Game.scene = scene;

Game.Settings.BackgroundColour = "black";

Player.AddToScene(scene);

Game.Loaded.AddListener(() => {
    Game.Camera.position = new Vector(
        Player.GameObject.position.x - (Game.Settings.NativeWidth - Player.GameObject.scale.x) / 2,
        Player.GameObject.position.y - (Game.Settings.NativeHeight - Player.GameObject.scale.y) / 2
    );

    Game.CreateCanvas();
    Game.Start();
});

Game.PreUpdate.AddListener((delta) => {
    let targetPosition = new Vector(
        Player.GameObject.position.x - (Game.Settings.NativeWidth - Player.GameObject.scale.x) / 2,
        Player.GameObject.position.y - (Game.Settings.NativeHeight - Player.GameObject.scale.y) / 2
    );

    Game.Camera.position.lerp(targetPosition, 8 * delta);
});