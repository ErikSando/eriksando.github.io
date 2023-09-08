const StartButton = new ImageButton(
    new Vector((Game.Settings.NativeWidth - 210) / 2, (Game.Settings.NativeHeight - 90) / 2),
    new Vector(210, 90),
    Textures.UI.start
);

const Time = new TextLabel(new Vector(15, 20), new Vector(200, 30), "");
Time.textAlignX = TextAlignX.Left;
Time.textSize = 35;

const FpsDisplay = new TextLabel(new Vector(15, 65), new Vector(100, 30), "... FPS");
FpsDisplay.textAlignX = TextAlignX.Left;

const VictoryText = new TextLabel(new Vector(460, 400), new Vector(1000, 100), "You win!");
VictoryText.textSize = 100;

const FinalTime = new TextLabel(new Vector(460, 600), new Vector(1000, 100));
FinalTime.textSize = 80;

const RespawnButton = new ImageButton(
    new Vector((Game.Settings.NativeWidth - 282) / 2, (Game.Settings.NativeHeight - 90) / 2),
    new Vector(282, 90),
    Textures.UI.respawn
);
RespawnButton.visible = false;

const LeftButton = new ImageButton(new Vector(100, Game.Settings.NativeHeight - 300), new Vector(200, 200), Textures.UI.left);
LeftButton.imageOpacity = 0.5;

const RightButton = new ImageButton(new Vector(400, Game.Settings.NativeHeight - 300), new Vector(200, 200), Textures.UI.right);
RightButton.imageOpacity = 0.5;

const JumpButton = new ImageButton(new Vector(Game.Settings.NativeWidth - 300, Game.Settings.NativeHeight - 300), new Vector(200, 200), Textures.UI.up);
JumpButton.imageOpacity = 0.5;

const UI = {
    Start: [ StartButton ],
    Play: [ Time, FpsDisplay, RespawnButton ],
    End: [ VictoryText, FinalTime ],
    Mobile: [ LeftButton, RightButton, JumpButton ]
}

let totalLevels = Levels.length - 1;
let level = 1;
let gameState = "Start";
let stopwatch = new Stopwatch();

let player;

const GameStarted = new _Event();

function LoadLevel(level) {
    let scene = Levels[level];
    Game.LoadScene(scene);
    Game.scene.UIObjects = UI.Play;

    Game.Camera.position = new Vector(0, LevelData[level].length * blockSize - Game.Settings.NativeHeight);
}

function LevelComplete() {
    if (level + 1 > totalLevels) {
        Game.scene = EndScene;
        Game.Camera.position = new Vector(0, 0);
        gameState = "End";
        Game.scene.UIObjects = UI.End;
        Game.MobileUI = [];
    
        return;
    }

    level++;
    LoadLevel(level);
    player = new Player(new Vector(128, (LevelData[level].length - 1) * blockSize - 112), new Vector(52, 112), Game.scene);
}

StartButton.Mouse1Down.AddListener(() => {
    level = 1;
    LoadLevel(level);
    
    player = new Player(new Vector(128, (LevelData[level].length - 1) * blockSize - 112), new Vector(52, 112), Game.scene);

    Game.Camera.position = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    gameState = "Play";

    Game.scene.UIObjects = UI.Play;
    Game.MobileUI = UI.Mobile;
});

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    //Game.Settings.ImageSmoothing = false;

    LoadLevel(level);

    Game.scene.UIObjects = UI.Start;

    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    FpsDisplay.text = Game.GetFPS() + " FPS";

    if (gameState == "Start") {
        scale = window.innerWidth / Game.Settings.NativeWidth;
        let topLeftCorner = new Vector(LevelData[level][0].length * blockSize - Game.Settings.NativeWidth, 0);
        let direction = Vector.Subtract(topLeftCorner, Game.Camera.position);

        if (direction.y >= 0) {
            if (level >= Levels.length - 1) level = 1;
            else level++;

            Game.scene = Levels[level];
            Game.Camera.position = new Vector(0, LevelData[level].length * blockSize - Game.Settings.NativeHeight);
        }

        Game.Camera.position.add(direction.normalised().multiply(100 * delta));

        return;
    
    } else if (gameState == "End") {
        FinalTime.text = "Time: " + stopwatch.GetTime();

        return;
    }

    if (player.alive) {
        if (player.GameObject.position.x < Game.Camera.position.x + Game.Settings.NativeWidth * 2/5) {
            Game.Camera.position.x = player.GameObject.position.x - Game.Settings.NativeWidth * 2/5;
        
        } else if (player.GameObject.position.x > Game.Camera.position.x + Game.Settings.NativeWidth * 3/5) {
            Game.Camera.position.x = player.GameObject.position.x - Game.Settings.NativeWidth * 3/5;
        }

        if (player.GameObject.position.y < Game.Camera.position.y + Game.Settings.NativeHeight / 3) {
            Game.Camera.position.y = player.GameObject.position.y - Game.Settings.NativeHeight / 3;

        } else if (player.GameObject.position.y > Game.Camera.position.y + Game.Settings.NativeHeight * 2/3) {
            Game.Camera.position.y = player.GameObject.position.y - Game.Settings.NativeHeight * 2/3;
        }
    }
    
    Game.Camera.position.x = Clamp(Game.Camera.position.x, 0, LevelData[level][0].length * blockSize - Game.Settings.NativeWidth);
    Game.Camera.position.y = Clamp(Game.Camera.position.y, 0, LevelData[level].length * blockSize - Game.Settings.NativeHeight)
    //Game.Camera.position = Vector.Lerp(Game.Camera.position);

    stopwatch.Update(delta);
    Time.text = stopwatch.GetTime();
});
