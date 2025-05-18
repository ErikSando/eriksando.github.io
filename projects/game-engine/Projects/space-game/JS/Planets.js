const PlanetInfos = [
    {
        name: "Hi",
        length: 1000,
        height: 100,
        BackgroundColour: "rgb(50, 150, 250)",
        BlockSize: 64,
        BlockInfo: {
            1: {
                image: Assets.Images.blocks.grass
            },

            2: {
                image: Assets.Images.blocks.dirt
            },

            3: {
                image: Assets.Images.blocks.stone
            }
        },
        WorldGenSettings: {
            MaxPlaneLength: 1,
            Ores: [
                {
                    tile: 4,
                    rarity: 10,
                    range: {
                        max: 50
                    }
                },
                {
                    tile: 5,
                    rarity: 20,
                    range: {
                        min: 60,
                        max: 80
                    }
                },
                {
                    tile: 6,
                    rarity: 60,
                    range: {
                        min: 80
                    }
                }
            ]
        }
    }
];

const Planets = [];

function InitPlanets() {
    for (let i = 0; i < PlanetInfos.length; i++) {
        let info = PlanetInfos[i];
    
        Planets.push({
            scene: CreatePlanetScene(info, GenerateWorldData(info.length, info.height, info.WorldGenSettings), PlanetUI),
            CameraStartPos: new Vector((info.length * info.BlockSize - Game.Settings.NativeWidth) / 2, (info.height * info.BlockSize - Game.Settings.NativeHeight) / 2),
            name: info.name
        });
    
        delete planet;
    }
}

function LoadPlanet(index) {
    Game.scene = Planets[index].scene;
    Game.Camera.position = Planets[index].CameraStartPos;
}

function GetPlanetInfo(index) {
    return PlanetInfos[index];
}

function GetPlanetScene(index) {
    return Planets[index].scene;
}

function GetPlanetName(index) {
    return Planets[index].name;
}

function GetPlanetCameraStartPos(index) {
    return Planets[index].CameraStartPos;
}