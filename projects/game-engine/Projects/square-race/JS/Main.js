const squares = [];

Game.Loaded.AddListener(() => {
    squares.push(new Square("Red", "red"));

    Game.CreateCanvas();
    Game.Start();
});