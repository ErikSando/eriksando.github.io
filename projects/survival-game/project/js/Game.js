let canvas;
let ctx;

// constants
const NativeWidth = 1920;
const NativeHeight = 1080;
const AspectRatio = NativeWidth / NativeHeight;
let scale;

const Gravity = 1800;
const TerminalVelocity = 2400;

const worldLength = 1000; // increase when world is optimised
const worldHeight = 100;

const blockSize = 64;

const lightingEnabled = false;

const CameraPosition = {
    x: (worldLength / 2) * blockSize - NativeWidth / 2,
    y: (worldHeight / 2) * blockSize - NativeHeight / 2
}

let GameState = "Start";

let generatingBG = new UIObject(0, 0, NativeWidth, NativeHeight);
generatingBG.bgColour = "rgb(20, 40, 80)";
generatingBG.outlineOpacity = 1;

let generatingText = new TextLabel(0, 0, NativeWidth, NativeHeight, "Generating World...");

const StartUI = [];
const GeneratingUI = [
    generatingBG,
    generatingText
]
const PlayUI = [];
const PauseUI = [];

const UI = [];

const Enemies = [];

const FpsDisplay = new TextLabel(10, 10, 100, 40, "... FPS");
UI.push(FpsDisplay);

window.addEventListener("load", () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    let worldData = GenerateWorldData(worldLength, worldHeight);

    GameState = "Play";

    World.SetBlocks(worldData.blockData);

    const player = new Player(worldData.playerSpawn.x, worldData.playerSpawn.y, 52, 112);

    // zombie testing
    // Enemies.push(new Zombie(worldData.playerSpawn.x, worldData.playerSpawn.y, 52, 112));

    function Resize() {
        let dominantAxis = window.innerWidth / window.innerHeight < AspectRatio ? "x" : "y";

        if (dominantAxis == "x") {
            canvas.width = window.innerWidth;
            canvas.height = window.innerWidth / AspectRatio;

        } else {
            canvas.height = window.innerHeight;
            canvas.width = window.innerHeight * AspectRatio;
        }

        scale = canvas.width / NativeWidth;

        ctx.imageSmoothingEnabled = false;
    }

    window.addEventListener("resize", Resize);
    Resize();

    let fpses = [];
    let lastFpsUpdate;

    let lastUpdate;

    function Update(timestamp) {
        if (GameState == "Start" || GameState == "Generating") {
            Draw();

            requestAnimationFrame(Update);

            return;
        }

        const delta = (timestamp - lastUpdate) / 1000;
        lastUpdate = timestamp;

        if (!delta || isNaN(delta) || delta < 0 || delta > 0.1) {
            Draw();
            requestAnimationFrame(Update);
            return;
        }
 
        fpses.push(1 / delta);

        if (timestamp - lastFpsUpdate > 1000) {
            lastFpsUpdate = timestamp;

            totalFPS = 0;
            for (let fps of fpses) totalFPS += fps;

            let FPS = totalFPS / fpses.length;

            FpsDisplay.text = Math.round(FPS) + " FPS";

            fpses = [];
        }

        player.Update(delta);

        for (let enemy of Enemies) enemy.Update(delta, player);

        CameraPosition.x = player.x + player.w / 2 - NativeWidth / 2;
        CameraPosition.y = player.y + player.h / 2 - NativeHeight / 2;

        Draw();

        requestAnimationFrame(Update);
    }

    function Draw() {
        if (GameState == "Start") {
            for (let uiObject of StartUI) uiObject.Draw(ctx);

        } else if (GameState == "Generating") {
            for (let uiObject of GeneratingUI) {
                console.log(uiObject);
                
                uiObject.Draw(ctx);
            }
        }

        let scale = canvas.width / NativeWidth;
        ctx.setTransform(scale, 0, 0, scale, -CameraPosition.x * scale, -CameraPosition.y * scale);

        ctx.fillStyle = "rgb(0, 180, 240)"; // add a parralax sky image later
        ctx.fillRect(CameraPosition.x, CameraPosition.y, NativeWidth, NativeHeight);

        World.Draw(ctx);
        player.Draw(ctx);

        for (let enemy of Enemies) enemy.Draw(ctx);
        for (let uiObject of UI) uiObject.Draw(ctx);
    }

    function Start(timestamp) {
        lastUpdate = timestamp;
        lastFpsUpdate = timestamp - 1000;
        
        requestAnimationFrame(Update);
    }

    requestAnimationFrame(Start);
});