// Runs once the engine is finished setting up
Game.Loaded.AddListener(() => {
    GridHandler.Init(100);

    let export_button = new TextButton(new Vector(760, 980), new Vector(140, 70), "Export");
    let import_button = new TextButton(new Vector(1020, 980), new Vector(140, 70), "Import");
    
    soft_erase_enabled = false;

    export_button.outlineColour = "rgb(0, 100, 0)";
    export_button.bgColour = "rgb(0, 140, 0)";
    export_button.outlineThickness = 5;
    
    import_button.outlineColour = "rgb(0, 100, 0)";
    import_button.bgColour = "rgb(0, 140, 0)";
    import_button.outlineThickness = 5;

    Game.scene.AddUI(export_button, import_button);

    Game.Camera.position.y += 50;

    export_button.Mouse1Up.AddListener(() => {
        ExportData(GridHandler.GetGrid());
    });

    import_button.Mouse1Up.AddListener(() => {
        ImportData();
    });

    Game.Settings.BackgroundColour = "black";

    Game.CreateCanvas();
    Game.Start();

    console.log("Press C to clear the grid.");
});