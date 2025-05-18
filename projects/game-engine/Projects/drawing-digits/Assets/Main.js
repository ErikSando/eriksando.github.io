// Runs once the engine is finished setting up
Game.Loaded.AddListener(() => {
    CellHandler.Init(28, 32);

    let export_button = new TextButton(new Vector(650, 980), new Vector(140, 70), "Export");
    let import_button = new TextButton(new Vector(870, 980), new Vector(140, 70), "Import");
    let enable_soft_erase_button = new TextButton(new Vector(1100, 980), new Vector(250, 70), "Enable Soft Erase");
    
    soft_erase_enabled = false;

    export_button.outlineColour = "rgb(0, 100, 0)";
    export_button.bgColour = "rgb(0, 140, 0)";
    export_button.outlineThickness = 5;
    
    import_button.outlineColour = "rgb(0, 100, 0)";
    import_button.bgColour = "rgb(0, 140, 0)";
    import_button.outlineThickness = 5;

    enable_soft_erase_button.outlineColour = "rgb(0, 100, 0)";
    enable_soft_erase_button.bgColour = "rgb(0, 140, 0)";
    enable_soft_erase_button.outlineThickness = 5;

    enable_soft_erase_button.Mouse1Up.AddListener(() => {
        soft_erase_enabled = !soft_erase_enabled;
        enable_soft_erase_button.text = (soft_erase_enabled ? "Disable" : "Enable") + " Soft Erase";
    })

    Game.scene.AddUI(export_button, import_button, enable_soft_erase_button);

    Game.Camera.position.y += 50;

    export_button.Mouse1Up.AddListener(() => {
        ExportData(CellHandler.GetCellData());
    });

    import_button.Mouse1Up.AddListener(() => {
        ImportData();
    });

    Input.KeyUp.AddListener((keycode) => {
        switch (keycode) {
            case KeyCode.KeyC:
                CellHandler.Clear();
            break;
        }
    });

    let mouse1down = false;
    let mouse2down = false;

    Input.Mouse1Down.AddListener((pos) => {
        mouse1down = true;

        let true_pos = { x: pos.x + Game.Camera.position.x, y: pos.y + Game.Camera.position.y }
        CellHandler.DrawAtLocation(true_pos.x, true_pos.y, 10);
    });

    Input.Mouse1Up.AddListener(() => {
        mouse1down = false;
    });

    Input.Mouse2Down.AddListener((pos) => {
        mouse2down = true;

        let true_pos = { x: pos.x + Game.Camera.position.x, y: pos.y + Game.Camera.position.y }
        if (soft_erase_enabled) {
            CellHandler.DrawAtLocation(true_pos.x, true_pos.y, 10, true);
        }
        else {
            CellHandler.Erase(true_pos.x, true_pos.y);
        }
    });

    Input.Mouse2Up.AddListener(() => {
        mouse2down = false;
    })
    
    Input.MouseMove.AddListener((new_pos, old_pos) => {
        let true_pos = { x: new_pos.x + Game.Camera.position.x, y: new_pos.y + Game.Camera.position.y }
        let multiplier = Vector.DistanceBetween(new_pos, old_pos);

        if (mouse1down) {
            CellHandler.DrawAtLocation(true_pos.x, true_pos.y, multiplier);
        }

        if (mouse2down) {
            soft_erase_enabled ? CellHandler.DrawAtLocation(true_pos.x, true_pos.y, multiplier, true) : CellHandler.Erase(true_pos.x, true_pos.y, multiplier);
        }
    });

    Input.MouseWheel.AddListener((direction) => {
        CellHandler.cellsize -= direction * CellHandler.cellsize / 50;
    });

    Game.Settings.BackgroundColour = "black";

    Game.CreateCanvas();
    Game.Start();

    console.log("Press C to clear the grid.");
});
