let planet = 0;

InitPlanets();
LoadPlanet(planet);

let scene = GetPlanetScene(planet);
let blockSize = GetPlanetInfo(planet).BlockSize;
let position = GetPlanetCameraStartPos(planet).plus(new Vector(Game.Settings.NativeWidth / 2, Game.Settings.NativeHeight / 2)).minus(new Vector(blockSize, blockSize * 2));
const player = new Player(scene, position);

Game.Loaded.AddListener(() => {
    Game.Camera.position = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.CreateCanvas();
    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    FpsDisplay.text = Game.GetFPS() + " FPS";

    let targetPosition = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.Camera.position = Vector.Lerp(
        Game.Camera.position,
        targetPosition,
        10 * delta
    );
});