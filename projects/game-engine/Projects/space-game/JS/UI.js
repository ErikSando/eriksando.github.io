const FpsDisplay = new TextLabel(new Vector(10, 10), new Vector(150, 50), "... FPS");
FpsDisplay.textStrokeColour = "black";
FpsDisplay.textColour = "white";
FpsDisplay.textAlignX = TextAlignX.Left;
FpsDisplay.textAlignY = TextAlignY.Top;

const GlobalUI = [FpsDisplay];

const PlanetUI = [];
for (let uiObject of GlobalUI) PlanetUI.push(uiObject);