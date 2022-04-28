const simpleSceneCreator = new SimpleSceneCreator();

let tileSize = Math.max(window.innerWidth / 20, window.innerHeight / 15);
let oldTileSize = tileSize;
let tileColour = 'black';
let tileTransparency = 0.5;
let worldLength = 100;

class SceneGenerator {
    CreateSceneData() {
        let output = [
            [], [], [], [], [],
            [], [], [], [], [],
            [], [], [], [], []
        ]

        for (let i = 0; i < output.length; i++) {
            for (let j = 0; j < worldLength; j++) {
                output[i][j] = 0;
            }
        }

        let totalElevation = 0;

        let halfWayY = Math.floor(output.length / 2);
        let halfWayX = Math.floor(worldLength / 2);

        output[halfWayY][halfWayX] = 2;

        for (let i = 1; i < output.length - halfWayY; i++) {
            output[halfWayY + i][halfWayX] = 2;
        }
        
        for (let i = halfWayX - 1; i > -1; i--) {
            let planeLength = Math.floor(Math.random() * (5 - 1) + 1);

            if (i - planeLength < 0) planeLength = i;

            let elevation = Math.floor(Math.random() * (2 + 1) - 1);

            if (totalElevation + elevation == 5) {
                elevation = 0;
            } else if (totalElevation + elevation == -5) {
                elevation = 0;
            }

            totalElevation += elevation;

            for (let j = 0; j < planeLength; j++) {
                output[halfWayY + totalElevation][i - j] = 2;

                for (let k = j + 1; k < output.length - (halfWayY + totalElevation); k++) {
                    output[halfWayY + totalElevation - j + k][i - j] = 2;
                }
            }

            if (planeLength - 1 >= 0 ) i -= planeLength - 1;
            else i -= planeLength;
        }

        totalElevation = 0;

        for (let i = halfWayX + 1; i < worldLength; i++) {
            let planeLength = Math.floor(Math.random() * (5 - 1) + 1);

            if (planeLength + i > worldLength) planeLength = worldLength - i;
            
            let elevation = Math.floor(Math.random() * (2 + 1) - 1);

            if (totalElevation + elevation == 5) {
                elevation = 0;
            } else if (totalElevation + elevation == -5) {
                elevation = 0;
            }

            totalElevation += elevation;

            for (let j = 0; j < planeLength; j++) {
                output[halfWayY + totalElevation][i + j] = 2;

                for (let k = j + 1; k < output.length - (halfWayY + totalElevation); k++) {
                    output[halfWayY + totalElevation + k - j][i + j] = 2;
                }
            }

            i += planeLength - 1;
        }

        return output;
    }

    CreateScene() {
        return simpleSceneCreator.CreateScene(this.CreateSceneData(), tileSize, tileColour, tileTransparency);
    }

    CreateSceneFromData(data) {
        return simpleSceneCreator.CreateScene(data, tileSize, tileColour, tileTransparency);
    }

    UpdateScene(scene) {
        for (let i = 0; i < scene.gameObjects.length; i++) {
            scene.gameObjects[i].position.x = scene.gameObjects[i].position.x / oldTileSize * tileSize;
            scene.gameObjects[i].position.y = scene.gameObjects[i].position.y / oldTileSize * tileSize;

            scene.gameObjects[i].scale.x = tileSize;
            scene.gameObjects[i].scale.y = tileSize;
        }

        return scene;
    }

    UpdateTileSize(newTileSize) {
        oldTileSize = tileSize;
        tileSize = newTileSize;
    }
}
