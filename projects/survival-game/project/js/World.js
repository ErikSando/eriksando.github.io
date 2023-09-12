const BlockNames = {
    1: "grass",
    2: "dirt",
    3: "stone"
}

const Blocks = {
    grass: Grass,
    dirt: Dirt,
    stone: Stone
}

const World = new class {
    blocks = [];
    blockAtPosition = [];

    SetBlocks(blockData) {
        this.blocks = blockData.blocks;
        this.blockAtPosition = blockData.blockAtPosition;
    }

    AddBlock(position, type) {
        let block = new Blocks[type](position.x * blockSize, position.y * blockSize, blockSize, blockSize);

        this.blocks.push(block);
        this.blockAtPosition[position.y][position.x] = block;
    }

    RemoveBlock(block) {
        if (block.id == "bedrock") return;

        for (let _block of this.blocks) {
            if (_block == block) {
                this.blocks.splice(this.blocks.indexOf(_block), 1);

                this.blockAtPosition[block.y / blockSize][block.x / blockSize] = undefined;

                break;
            }
        }
    }

    Raycast(start, end, ignoreList = []) {
        let ray = {
            start: start,
            end: end
        }

        // this algorithm finds all the possible blocks the ray could collide with and only checks for collision with those blocks
        let minX = Math.min(start.x, end.x), maxX = Math.max(start.x, end.x);
        let minY = Math.min(start.y, end.y), maxY = Math.max(start.y, end.y);

        let startPosX = Math.floor(minX / blockSize);
        let startPosY = Math.floor(minY / blockSize);

        let endPosX = Math.floor(maxX / blockSize);
        let endPosY = Math.floor(maxY / blockSize);

        for (let x = startPosX; x <= endPosX; x++) {
            for (let y = startPosY; y <= endPosY; y++) {
                if (x < 0 || y < 0 || x >= this.blockAtPosition[0].length || y >= this.blockAtPosition.length) continue;
                if (!this.blockAtPosition[y][x]) continue;
                if (ignoreList.includes(this.blockAtPosition[y][x])) continue;

                if (RectAndLineIntersection(this.blockAtPosition[y][x], ray)) return this.blockAtPosition[y][x];
            }
        }
    
        return null;
    }

    Draw(ctx) {
        let displayRect = {
            x: CameraPosition.x,
            y: CameraPosition.y,
            w: NativeWidth,
            h: NativeHeight
        }

        for (let block of this.blocks) {
            if (RectIntersection(displayRect, block)) block.Draw(ctx)
        }
    }
}