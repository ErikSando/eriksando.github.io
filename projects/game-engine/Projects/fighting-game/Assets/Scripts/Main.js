Game.LoadScene(StartMenu);

const PlayerCollisionGroup = new CollisionGroup("player", [], true);

let player1, player2;

startButton.Mouse1Down.AddListener(() => {
    console.log("Start button clicked");

    player1 = new CharacterClasses[player1selected](new Vector(200, Game.Settings.NativeHeight - 400), 1, PlayScene);
    player2 = new CharacterClasses[player2selected](new Vector(Game.Settings.NativeWidth - 200, Game.Settings.NativeHeight - 400), 2, PlayScene);

    Game.LoadScene(PlayScene);
});

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});