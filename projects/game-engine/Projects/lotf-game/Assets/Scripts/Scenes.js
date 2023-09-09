const startMenuBG = new UIObject(Vector.zero(), new Vector(Game.Settings.NativeWidth, Game.Settings.NativeHeight));
startMenuBG.bgColour = "rgb(100, 100, 100)";

const title = new TextLabel(new Vector(0, 50), new Vector(Game.Settings.NativeWidth, 100), "LOTF Fighting Game");
title.textSize = 60;

const player1title = new TextLabel(new Vector(0, 200), new Vector(Game.Settings.NativeWidth / 2, 60), "Player 1");
const player2title = new TextLabel(new Vector(Game.Settings.NativeWidth / 2, 200), new Vector(Game.Settings.NativeWidth / 2, 60), "Player 2");
player1title.textSize = 40;
player2title.textSize = 40;

let player1selected = Random.Choice(Characters);

let availabeCharacters = [...Characters];
availabeCharacters.splice(Characters.indexOf(player1selected), 1);

let player2selected = Random.Choice(availabeCharacters);

const player1selectedImg = new ImageLabel(new Vector(Game.Settings.NativeWidth / 4 - 66, 300), new Vector(132, 330), Sprites.icons[player1selected].right);
const player1selectedText = new TextLabel(new Vector(0, 700), new Vector(Game.Settings.NativeWidth / 2, 40), "Selected: " + player1selected);
const player1Erik = new TextButton(new Vector(Game.Settings.NativeWidth / 4 - 60, 750), new Vector(120, 40), "Erik");
const player1Savas = new TextButton(new Vector(Game.Settings.NativeWidth / 4 - 60, 800), new Vector(120, 40), "Savas");
const player1Nythan = new TextButton(new Vector(Game.Settings.NativeWidth / 4 - 60, 850), new Vector(120, 40), "Nythan");
const player1Eryx = new TextButton(new Vector(Game.Settings.NativeWidth / 4 - 60, 900), new Vector(120, 40), "Eryx");

player1Erik.bgColour = "#0c61ca";
player1Erik.outlineThickness = 2;
player1Erik.outlineColour = "white";
player1Savas.bgColour = "#16b125";
player1Savas.outlineThickness = 2;
player1Savas.outlineColour = "white";
player1Nythan.bgColour = "#8f1111";
player1Nythan.outlineThickness = 2;
player1Nythan.outlineColour = "white";
player1Eryx.bgColour = "#dad013";
player1Eryx.outlineThickness = 2;
player1Eryx.outlineColour = "white";

player1Erik.Mouse1Down.AddListener(() => {
    if (player2selected == "Erik") return;

    player1selected = "Erik";
    player1selectedText.text = "Selected: Erik";
    player1selectedImg.image = Sprites.icons.Erik.right;
});

player1Savas.Mouse1Down.AddListener(() => {
    if (player2selected == "Savas") return;

    player1selected = "Savas";
    player1selectedText.text = "Selected: Savas";
    player1selectedImg.image = Sprites.icons.Savas.right;
});

player1Nythan.Mouse1Down.AddListener(() => {
    if (player2selected == "Nythan") return;

    player1selected = "Nythan";
    player1selectedText.text = "Selected: Nythan";
    player1selectedImg.image = Sprites.icons.Nythan.right;
});

player1Eryx.Mouse1Down.AddListener(() => {
    if (player2selected == "Eryx") return;

    player1selected = "Eryx";
    player1selectedText.text = "Selected: Eryx";
    player1selectedImg.image = Sprites.icons.Eryx.right;
});

const player2selectedText = new TextLabel(new Vector(Game.Settings.NativeWidth / 2, 700), new Vector(Game.Settings.NativeWidth / 2, 40), "Selected: " + player2selected);
const player2selectedImg = new ImageLabel(new Vector(Game.Settings.NativeWidth * 3/4 - 66, 300), new Vector(132, 330), Sprites.icons[player2selected].left);
const player2Erik = new TextButton(new Vector(Game.Settings.NativeWidth * 3/4 - 60, 750), new Vector(120, 40), "Erik");
const player2Savas = new TextButton(new Vector(Game.Settings.NativeWidth * 3/4 - 60, 800), new Vector(120, 40), "Savas");
const player2Nythan = new TextButton(new Vector(Game.Settings.NativeWidth * 3/4 - 60, 850), new Vector(120, 40), "Nythan");
const player2Eryx = new TextButton(new Vector(Game.Settings.NativeWidth * 3/4 - 60, 900), new Vector(120, 40), "Eryx");

const startButton = new TextButton(new Vector(Game.Settings.NativeWidth * 3/7, 800), new Vector(Game.Settings.NativeWidth / 7, 90), "START")
startButton.textColour = "black";
startButton.bgColour = "white";
startButton.textSize = 50;

player2Erik.bgColour = "#0c61ca";
player2Erik.outlineThickness = 2;
player2Erik.outlineColour = "white";
player2Savas.bgColour = "#16b125";
player2Savas.outlineThickness = 2;
player2Savas.outlineColour = "white";
player2Nythan.bgColour = "#8f1111";
player2Nythan.outlineThickness = 2;
player2Nythan.outlineColour = "white";
player2Eryx.bgColour = "#dad013";
player2Eryx.outlineThickness = 2;
player2Eryx.outlineColour = "white";

player2Erik.Mouse1Down.AddListener(() => {
    if (player1selected == "Erik") return;

    player2selected = "Erik";
    player2selectedText.text = "Selected: Erik";
    player2selectedImg.image = Sprites.icons.Erik.left;
});

player2Savas.Mouse1Down.AddListener(() => {
    if (player1selected == "Savas") return;

    player2selected = "Savas";
    player2selectedText.text = "Selected: Savas";
    player2selectedImg.image = Sprites.icons.Savas.left;
});

player2Nythan.Mouse1Down.AddListener(() => {
    if (player1selected == "Nythan") return;

    player2selected = "Nythan";
    player2selectedText.text = "Selected: Nythan";
    player2selectedImg.image = Sprites.icons.Nythan.left;
});

player2Eryx.Mouse1Down.AddListener(() => {
    if (player1selected == "Eryx") return;

    player2selected = "Eryx";
    player2selectedText.text = "Selected: Eryx";
    player2selectedImg.image = Sprites.icons.Eryx.left;
});

const StartMenuUI = [
    startMenuBG, title,
    player1title, player1selected, player1selectedImg, player1selectedText, player1Erik, player1Savas, player1Nythan, player1Eryx,
    player2title, player2selected, player2selectedImg, player2selectedText, player2Erik, player2Savas, player2Nythan, player2Eryx,
    startButton
]

const ground = new GameObject(new Vector(0, Game.Settings.NativeHeight - 200), new Vector(Game.Settings.NativeWidth, 200), true);
ground.colour = "darkgreen";

const leftBorder = new GameObject(new Vector(-200, -200), new Vector(200, Game.Settings.NativeHeight + 400), true);
const rightBorder = new GameObject(new Vector(Game.Settings.NativeWidth, -200), new Vector(200, Game.Settings.NativeHeight + 400), true);
const topBorder = new GameObject(new Vector(0, -200), new Vector(Game.Settings.NativeWidth - 200, 200), true);

const healthBar1BG = new UIObject(new Vector(20, 20), new Vector(300, 30));
healthBar1BG.bgColour = "rgb(30, 30, 30)";
healthBar1BG.outlineColour = "black";
healthBar1BG.outlineThickness = 3;

const healthBar1 = new UIObject(new Vector(20, 20), new Vector(300, 30), 2);
healthBar1.bgColour = "rgb(0, 200, 0)";
healthBar1.outlineThickness = 0;

const healthBar2BG = new UIObject(new Vector(Game.Settings.NativeWidth - 320, 20), new Vector(300, 30));
healthBar2BG.bgColour = "rgb(30, 30, 30)";
healthBar2BG.outlineColour = "black";
healthBar2BG.outlineThickness = 3;

const healthBar2 = new UIObject(new Vector(Game.Settings.NativeWidth - 320, 20), new Vector(300, 30), 2);
healthBar2.bgColour = "rgb(0, 200, 0)";
healthBar2.outlineThickness = 0;

const PlayGameObjects = [ground, leftBorder, rightBorder, topBorder];
const PlayUI = [healthBar1BG, healthBar1, healthBar2BG, healthBar2];

const StartMenu = new Scene("Start", [], StartMenuUI);
const PlayScene = new Scene("Play", PlayGameObjects, PlayUI);