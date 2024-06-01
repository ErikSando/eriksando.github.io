function GenerateWorldData(length, height, settings) {
    let data = [];
    for (let i = 0; i < height; i++) data.push(new Array(length));

    let midpointX = Math.floor(length / 2);
    let midpointY = Math.floor(height / 2);

    let elevation = 0;
    let minimum = -height / 4;
    let maximum = height / 4;
    let planeStart = midpointX;
    let planeLength = 1;

    function Generate(x, newPlane) {
        if (newPlane) {
            planeLength = Random.Integer(1, settings.MaxPlaneLength);
            planeStart = x;

            let min = 0, max = 0;
        
            if (elevation > minimum) min = -1;
            if (elevation < maximum) max = 1;

            elevation += Random.Integer(min, max);
        }
        
        data[midpointY + elevation][x] = 1;

        let startY = midpointY + elevation + 1

        for (let y = startY; y < height; y++) {
            if (y == height - 1) {
                data[y][x] = 0;
                continue;
            }

            if (y - startY >= 3) {
                let oreSpawned = false;

                for (let i = settings.Ores.length; i--;) {
                    let ore = settings.Ores[i];
                    
                    if (Random.Integer(1, ore.rarity) == 1 && y > (ore.range.min || 0) && y < (ore.range.max || settings.height)) {
                        data[y][x] = ore.tile;
                        oreSpawned = true;
                        break;
                    }
                }

                if (oreSpawned) continue;

                data[y][x] = 3;

                continue;
            }

            data[y][x] = 2;
        }
    }

    // going left from spawn point
    for (let x = midpointX; x >= 0; x--) Generate(x, planeStart - x > planeLength);

    elevation = 0;

    // going right from spawn point
    for (let x = midpointX + 1; x < length; x++) Generate(x, x - planeStart > planeLength);

    return data;
}