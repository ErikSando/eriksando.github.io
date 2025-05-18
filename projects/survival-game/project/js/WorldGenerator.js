function GenerateWorldData(length, height) {
    //let data = [];
    let blocks = [];
    let blockAtPosition = [];

    for (let i = 0; i < height; i++) blockAtPosition.push(new Array(length));

    // for (let i = 0; i < height; i++) data.push(new Array(length));

    let midpointX = Math.floor(length / 2);
    let midpointY = Math.floor(height / 2);

    let elevation = 0;
    let minimum = -height / 4;
    let maximum = height / 4;
    let planeStart = midpointX;
    let planeLength = 1;
    let maxPlaneLength = 3;

    const OreClasses = {
        coal: Coal,
        iron: Iron,
        sapphire: Sapphire
    }

    function Generate(x, newPlane) {
        if (newPlane) {
            planeLength = RandomInteger(1, maxPlaneLength);
            planeStart = x;

            let min = 0, max = 0;
        
            if (elevation > minimum) min = -1;
            if (elevation < maximum) max = 1;

            elevation += RandomInteger(min, max);
        }
        
        //data[midpointY + elevation][x] = 1;
        let block = new Grass(x * blockSize, (midpointY + elevation) * blockSize, blockSize, blockSize);
        blocks.push(block);
        blockAtPosition[midpointY + elevation][x] = block;

        let startY = midpointY + elevation + 1

        for (let y = startY; y < height; y++) {
            if (y == height - 1) {
                let block = new Bedrock(x * blockSize, y * blockSize, blockSize, blockSize);
                blocks.push(block);
                blockAtPosition[y][x] = block;

                continue;
            }

            if (y - startY >= 3) {
                let oreSpawned = false;

                for (let ore of Ores) {
                    if (RandomInteger(1, OreChances[ore]) == 1 && y > OreRanges[ore].min && y < OreRanges[ore].max) {
                        let block = new OreClasses[ore](x * blockSize, y * blockSize, blockSize, blockSize);
                        blocks.push(block);
                        blockAtPosition[y][x] = block;
                        
                        oreSpawned = true;

                        break;
                    }
                }

                if (oreSpawned) continue;

                //data[y][x] = 3;
                let block = new Stone(x * blockSize, y * blockSize, blockSize, blockSize);
                blocks.push(block);
                blockAtPosition[y][x] = block;

                continue;
            }

            //data[y][x] = 2;
            let block = new Dirt(x * blockSize, y * blockSize, blockSize, blockSize);
            blocks.push(block);
            blockAtPosition[y][x] = block;
        }
    }

    // going left from spawn point
    for (let x = midpointX; x >= 0; x--) {
        let newPlane = planeStart - x > planeLength;

        Generate(x, newPlane);
    }

    elevation = 0;

    // going right from spawn point
    for (let x = midpointX + 1; x < length; x++) {
        let newPlane = x - planeStart > planeLength;

        Generate(x, newPlane);
    }

    return {
        //data: data,
        blockData: {
            blocks: blocks,
            blockAtPosition: blockAtPosition
        },

        playerSpawn: {
            x: midpointX * blockSize,
            y: midpointY * blockSize - blockSize * 2
        }
    }
}