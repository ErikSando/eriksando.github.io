const Levels = [];
const blockSize = 64;

const BlockNames = {
    0: "bg_brick",
    1: "brick",
    2: "spikes",
    3: "lava",
    4: "torch",
    5: "portal"
}

const KillCollisionGroup = new CollisionGroup("kill", ["player"]);

const BlockDetails = {
    0: {
        scale: new Vector(1, 1),
        offset: new Vector(0, 0),
        layer: 1
    },

    1: {
        scale: new Vector(1, 1),
        offset: new Vector(0, 0),
        layer: 2
    },

    2: {
        scale: new Vector(0.9375, 0.6875),
        offset: new Vector(0.03125, 0.325),
        layer: 4,
        kill: true
    },

    3: {
        scale: new Vector(1, 0.625),
        offset: new Vector(0, 0.375),
        layer: 4,
        kill: true
    },

    4: {
        scale: new Vector(0.25, 1),
        offset: new Vector(0.375, 0),
        layer: 2
    },

    5: {
        scale: new Vector(1, 2),
        offset: new Vector(0, -1),
        layer: 2
    },
}

const BlockCollidable = {
    0: false,
    1: true,
    2: true,
    3: true,
    4: false,
    5: true
}

const HasAnimation = {
    0: false,
    1: false,
    2: false,
    3: true,
    4: true,
    5: false
}

const OnWall = {
    0: false,
    1: false,
    2: true,
    3: true,
    4: true,
    5: true
}

for (let level in LevelData) {
    Levels[level] = new Scene();

    let levelData = LevelData[level];

    for (let y = 0; y < levelData.length; y++) {
        for (let x = 0; x < levelData[y].length; x++) {
            let tile = levelData[y][x];

            let name = BlockNames[tile];
            let collidable = BlockCollidable[tile];
            let hasAnimation = HasAnimation[tile];
            let scale = BlockDetails[tile].scale.multiplied(blockSize);
            let position = new Vector(x * blockSize, y * blockSize)
            let offset = BlockDetails[tile].offset.multiplied(blockSize);
            let layer = BlockDetails[tile].layer;

            let block = new GameObject(position.plus(offset), scale, true);
            block.tag = name;
            block.collidable = collidable;
            block.layer = layer;

            if ("kill" in BlockDetails[tile]) block.collisionGroup = KillCollisionGroup;

            if (hasAnimation) {
                let animation = new _Animation(Textures.blocks[name]);
                
                if (name == "lava") animation.fps = 0.5;
                else if (name == "torch") animation.fps = Random.Float() * 0.5 + 1;

                block.animation = animation;

            } else {
                block.image = Textures.blocks[name];
            }

            if (OnWall[tile]) {
                let bgBrick = new GameObject(position, new Vector(blockSize, blockSize), true, false);
                bgBrick.tag = "bg_brick";
                bgBrick.image = Textures.blocks.bg_brick;

                Levels[level].Add(bgBrick);
            }

            Levels[level].Add(block);
        }
    }
}

const EndScene = new Scene();

for (let x = 0; x < Game.Settings.NativeWidth / blockSize; x++) {
    for (let y = 0; y < Game.Settings.NativeHeight / blockSize; y++) {
        let block = new GameObject(new Vector(x * blockSize, y * blockSize), new Vector(blockSize, blockSize), true);
        block.image = Textures.blocks.brick;

        EndScene.Add(block);
    }
}