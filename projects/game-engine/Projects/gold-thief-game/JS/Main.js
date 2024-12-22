Game.Loaded.AddListener(() => {
    Game.scene = StartMenu;



    Thief.Mouse1Down.AddListener(() => {
        game.NewGame();
        Game.scene = PlayerOne;
    });

    Detective.Mouse1Down.AddListener(() => {
        game.NewGame(1);
        Game.scene = PlayerTwo;
    });

    RandomSide.Mouse1Down.AddListener(() => {
        let side = Math.round(Math.random());
        game.NewGame(side);
        Game.scene = side ? PlayerTwo : PlayerOne;
    });

    Game.CreateCanvas();
    Game.Start();
});