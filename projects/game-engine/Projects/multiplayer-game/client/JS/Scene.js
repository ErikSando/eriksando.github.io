Game.Settings.BackgroundColour = "rgb(50, 150, 250)";

const ground = new GameObject(new Vector(100, 880), new Vector(1720, 100), true);
ground.colour = "darkgreen";

const fps = new TextLabel(new Vector(10, 10), new Vector(150, 50), "... FPS");
fps.textAlignX = TextAlignX.Left;
fps.textAlignY = TextAlignY.Top;

Game.PostUpdate.AddListener(() => fps.text = Math.round(Game.FPS) + " FPS");

const GameObjects = [ground];
const UIObjects = [fps];

Game.scene = new Scene(GameObjects, UIObjects);