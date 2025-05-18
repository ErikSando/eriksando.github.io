let bgColour = 'white';

let sceneGenerator;
let sceneData;
let scene;

// Runs once the game engine has finished setting up
EngineEvents.EngineLoaded = () => {
	sceneGenerator = new SceneGenerator();
	sceneData = sceneGenerator.CreateSceneData();
	scene = sceneGenerator.CreateSceneFromData(sceneData);

   	game.settings.bgColour = bgColour;
	game.scene = scene;

	Input.OnKeyDown.ESC = () => {
		game.pause() ? game.running : game.resume();
	}

   	game.start();
}

window.addEventListener('resize', () => {
    sceneGenerator.UpdateTileSize(Math.min(window.innerWidth / 20, window.innerHeight / 15))
    scene = sceneGenerator.UpdateScene(scene);
	game.scene = scene;
});