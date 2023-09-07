const FPS = new TextLabel(new Vector(15, 5), new Vector(150, 50));
FPS.bgOpacity = 0;
FPS.outlineThickness = 0;
FPS.textColour = "white";
FPS.textSize = 40;
FPS.textAlignX = TextAlignX.Left;
FPS.textAlignY = TextAlignY.Top;
FPS.textStrokeOpacity = 1;
FPS.textStrokeThickness = 2;

const ground = new GameObject(new Vector(0, 980), new Vector(1920, 100), true);
ground.tag = "Ground";
ground.colour = "rgb(0, 200, 0)";

const block1 = new GameObject(new Vector(1000, 880), new Vector(100, 100), true);
block1.tag = "PurpleBlock";
block1.colour = "purple";

const block2 = new GameObject(new Vector(1200, 0), new Vector(100, 200), false);
block2.tag = "BlueBlock";
block2.colour = "blue";

const block3 = new GameObject(new Vector(1300, 880), new Vector(100, 100), true);
block3.tag = "OrangeBlock";
block3.colour = "orange";

const player = new Player();

let buttonImage = new Image();
buttonImage.src = "Assets/textures/UI/button.png";

const ResetPositionButton = new ImageButton(new Vector(1670, 50), new Vector(205, 70), buttonImage);

ResetPositionButton.Mouse1Down.AddListener(() => {
    player.GameObject.position = new Vector(200, 780);
    player.GameObject.velocity = Vector.zero();
})

let particleAnimationFrames = [ new Image(), new Image(), new Image() ]
particleAnimationFrames[0].src = "Assets/textures/particle/fire1.png";
particleAnimationFrames[1].src = "Assets/textures/particle/fire2.png";
particleAnimationFrames[2].src = "Assets/textures/particle/fire3.png";

let particleAnimation = new _Animation(particleAnimationFrames);

const particleObject = new GameObject(new Vector(700, 916), new Vector(64, 64), true);
particleObject.opacity = 1;
particleObject.animation = particleAnimation;
particleObject.tag = "Fire";

function MouseOver() {
    ResetPositionButton.bgColour = "rgb(130, 130, 130)";
}

function MouseDown() {
    ResetPositionButton.bgColour = "rgb(100, 100, 100)";
}

function MouseExit() {
    ResetPositionButton.bgColour = "rgb(150, 150, 150)";
}

ResetPositionButton.MouseEnter.AddListener(MouseOver);
ResetPositionButton.Mouse1Down.AddListener(MouseDown);
ResetPositionButton.Mouse1Up.AddListener(MouseOver);
ResetPositionButton.MouseExit.AddListener(MouseExit);

const scene = new Scene("Main", [ground, block1, block2, block3, particleObject, player.GameObject], [FPS, ResetPositionButton]);

Game.LoadScene(scene);

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();

    Game.Settings.BackgroundColour = "rgb(100, 200, 250)";

    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    FPS.text = Math.round(Game.GetFPS()) + " FPS";

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

let blocks = 0;

// performance testing
// function addBlocks() {
//     for (let i = 0; i < 100; i++) {
//         Game.scene.Add(new GameObject(new Vector(2500 + blocks * 110, 2000 + blocks * 110), new Vector(100, 100), true));

//         blocks++;
//     }

//     console.log("added 100 blocks")

//     setTimeout(addBlocks, 100);
// }

// setTimeout(addBlocks, 100);