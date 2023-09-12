let worldLength = 20000;

class WorldGenerator {
    constructor() {
        this.worldData = [
            [], [], [], [], [], [], [], [], [], [],
            [], [], [], [], [], [], [], [], [], [],
            [], [], [], [], [], [], [], [], [], [],
            [], [], [], [], [], [], [], [], [], [],
            [], [], [], [], [], [], [], [], [], []
        ]

        for (let i = 0; i < this.worldData.length; i++) {
            for (let j = 0; j < worldLength; j++) {
                this.worldData[i][j] = 0;
            }
        }
    }

    createWorld() {
        let totalElevation = 0;

        let halfWayY = Math.floor(this.worldData.length / 2) + 5;
        let halfWayX = Math.floor(worldLength / 2);

        this.worldData[halfWayY][halfWayX] = 2;

        for (let i = 1; i < this.worldData.length - halfWayY; i++) {
            this.worldData[halfWayY + i][halfWayX] = 1;
        }
        
        for (let i = halfWayX - 1; i > -1; i--) {
            let planeLength = Math.floor(Math.random() * (5 - 1) + 1);

            if (i - planeLength < 0) planeLength = i;

            let elevation = Math.floor(Math.random() * (2 + 1) - 1);

            if (totalElevation + elevation == 10) {
                elevation = 0;
            } else if (totalElevation + elevation == -5) {
                elevation = 0;
            }

            totalElevation += elevation;

            for (let j = 0; j < planeLength; j++) {
                this.worldData[halfWayY + totalElevation][i - j] = 2;

                for (let k = j + 1; k < this.worldData.length - (halfWayY + totalElevation); k++) {
                    this.worldData[halfWayY + totalElevation - j + k][i - j] = 1;
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
                this.worldData[halfWayY + totalElevation][i + j] = 2;

                for (let k = j + 1; k < this.worldData.length - (halfWayY + totalElevation); k++) {
                    this.worldData[halfWayY + totalElevation + k - j][i + j] = 1;
                }
            }

            i += planeLength - 1;
        }
        
        return this.worldData;
    }
}