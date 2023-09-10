Game.Settings.BackgroundColour = "rgb(0, 180, 240)";

Game.LoadScene(StartMenu);

const PlayerCollisionGroup = new CollisionGroup("player", ["player"]);

let player1, player2;

startButton.Mouse1Down.AddListener(() => {
    player1 = new CharacterClasses[player1selected](new Vector(200, Game.Settings.NativeHeight - 350), 1, PlayScene);
    player2 = new CharacterClasses[player2selected](new Vector(Game.Settings.NativeWidth - 200, Game.Settings.NativeHeight - 350), 2, PlayScene);

    Game.LoadScene(PlayScene);
});

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});