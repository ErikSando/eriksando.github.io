function GenerateWorldData(length, height, tileSize, maximum, minimum) {
    let worldData = [];
    let blockPositions = [];

    for (let i = 0; i < length; i++) {
        worldData.push(new Array(length));
    }

    let midpointX = Math.floor(length / 2);
    let midpointY = Math.floor(height / 2);
    let elevation = midpointX;

    let planeStart = midpointX;
    let planeLength = 2;

    function Generate(x, newPlane) {
        if (newPlane) {
            if (elevation <= minimum) elevation += Random.Integer(0, 1);
            else if (elevation >= maximum) elevation += Random.Integer(-1, 0);
            else elevation += Random.Integer(-1, 1);

            planeLength = Random.Integer(1, 5);
        }

        worldData[midpointY + elevation][x] = 1;
        blockPositions[midpointY + elevation][x] = 1;

        for (let y = midpointY + elevation + 1; y < height; y++) {
            worldData[y][x] = 2;
            blockPositions[y][x] = 2;
        }
    }

    // going left from middle
    for (let x = midpointX; x > 0; x--) Generate(x, planeStart - x > planeLength);

    elevation = midpointX;

    // going right from middle
    for (let x = midpointX + 1; x < length; x++) Generate(x, x - planeStart > planeLength);

    return {
        data: worldData,
        positions: blockPositions,
        spawn: {
            x: midpointX,
            y: midpointY - 2
        }
    }
}