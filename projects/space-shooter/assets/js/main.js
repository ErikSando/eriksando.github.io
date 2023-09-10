const WorldSize = new Vector(5000, 5000);

const Border1 = new GameObject(new Vector(-500, -500), new Vector(WorldSize.x + 1000, 500), true);
const Border2 = new GameObject(new Vector(-500, WorldSize.y), new Vector(WorldSize.x + 1000, 500), true);
const Border3 = new GameObject(new Vector(-500, 0), new Vector(500, WorldSize.y), true);
const Border4 = new GameObject(new Vector(WorldSize.x, 0), new Vector(500, WorldSize.y), true);

const BorderWarning1 = new GameObject(new Vector(0, 0), new Vector(WorldSize.x, 500), true);
const BorderWarning2 = new GameObject(new Vector(0, WorldSize.y - 500), new Vector(WorldSize.x, 500), true);
const BorderWarning3 = new GameObject(new Vector(0, 500), new Vector(500, WorldSize.y - 1000), true);
const BorderWarning4 = new GameObject(new Vector(WorldSize.x - 500, 500), new Vector(500, WorldSize.y - 1000), true);

Border1.colour = "red";
Border1.opacity = 1;
Border1.tag = "border";
Border2.colour = "red";
Border2.opacity = 1;
Border2.tag = "border";
Border3.colour = "red";
Border3.opacity = 1;
Border3.tag = "border";
Border4.colour = "red";
Border4.opacity = 1;
Border4.tag = "border";

BorderWarning1.colour = "red";
BorderWarning1.opacity = 0.1;
BorderWarning2.colour = "red";
BorderWarning2.opacity = 0.1;
BorderWarning3.colour = "red";
BorderWarning3.opacity = 0.1;
BorderWarning4.colour = "red";
BorderWarning4.opacity = 0.1;

const World = new Scene("World", [Border1, Border2, Border3, Border4, BorderWarning1, BorderWarning2, BorderWarning3, BorderWarning4]);
const player = new Player(new Vector(WorldSize.x / 2 - 52, WorldSize.y / 2 - 72));

const enemies = [];

function AddEnemy(enemy) {
    if (enemy instanceof Enemy) {
        enemies.push(enemy);
        World.Add(enemy.GameObject, enemy.Hitbox);
    }
}

function RemoveEnemy(enemy) {
    let index = enemies.indexOf(enemy);

    if (enemies[index]) {
        enemies.splice(index, 1);
        World.Remove(enemy.GameObject, enemy.Hitbox);
    }
}

// enemy testing
const enemy1 = new Enemy(new Vector(WorldSize.x / 2 + 352, WorldSize.y / 2 + 372), player.GameObject);


const BoostControl = new TextLabel(new Vector(20, 990), new Vector(300, 50), "Boost: W / Arrow Up");
BoostControl.textAlignX = TextAlignX.Left;
BoostControl.textOpacity = 0.6;

const ShootControl = new TextLabel(new Vector(20, 1030), new Vector(300, 50), "Shoot: Space");
ShootControl.textAlignX = TextAlignX.Left;
ShootControl.textOpacity = 0.6;

// const BordersMap = new UIObject(new Vector(1700, 860), new Vector(200, 200));
// BordersMap.outlineColour = "white";
// BordersMap.outlineOpacity = 0.8;
// BordersMap.outlineThickness = 4;
// BordersMap.bgColour = "white";
// BordersMap.bgOpacity = 0.5;

//const PlayerIcon = new ImageLabel(new Vector(1595, 950), new Vector(10, 20), Textures.icons.player);

const UI = [BoostControl, ShootControl];

World.AddUIArray(UI);
Game.LoadScene(World);

Game.Loaded.AddListener(() => {
    Game.Settings.BackgroundImage = Textures.background;

    Game.CreateCanvas();
    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    Game.Camera.position = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.Settings.BackgroundImageStart = new Vector(-Game.Camera.position.x / 2, -Game.Camera.position.y / 2);
});