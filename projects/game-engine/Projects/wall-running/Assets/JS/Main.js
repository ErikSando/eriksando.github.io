const ground = new GameObject(new Vector(200, 800), new Vector(600, 100), true);

const wall1 = new GameObject(new Vector(800, 300), new Vector(100, 600), true);
const wall2 = new GameObject(new Vector(520, 200), new Vector(100, 480), true);

const wall3 = new GameObject(new Vector(120, 620), new Vector(300, 100), true);

const platform = new GameObject(new Vector(800, 200), new Vector(500, 100), true)

const FPS = new TextLabel(new Vector(15, 15), new Vector(150, 50), "... FPS");
FPS.textSize = 35;
FPS.textAlignX = TextAlignX.Left;
FPS.textAlignY = TextAlignY.Top;

const scene = new Scene([ground, wall1, wall2, wall3, platform], [FPS]);

Game.scene = scene;

const player = new Player(new Vector(500, 700), scene);

let backgroundColour = "rgb(110, 120, 130)";

Game.Settings.BackgroundColour = backgroundColour;

Game.Loaded.AddListener(() => {
    Game.Camera.position = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.CreateCanvas();
    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    FPS.text = Game.GetFPS() + " FPS";
    
    let targetPosition = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.Camera.position = Vector.Lerp(
        Game.Camera.position,
        targetPosition,
        5 * delta
    );
});