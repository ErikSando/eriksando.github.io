class Block extends Entity {
    collidable = true;
    #worldPosX;
    #worldPosY;
    #checkLeft = true;
    #checkRight = true;
    #checkAbove = true;
    #checkBelow = true;

    constructor(x, y, w, h, id, image) {
        super(x, y, w, h);

        this.id = id;
        this.image = image;

        this.#worldPosX = Math.floor(this.x / blockSize);
        this.#worldPosY = Math.floor(this.y / blockSize);

        if (this.#worldPosX == 0) this.#checkLeft = false;
        if (this.#worldPosX == worldLength - 1) this.#checkRight = false;

        if (this.#worldPosY == 0) this.#checkAbove = false;
        if (this.#worldPosY == worldHeight - 1) this.#checkBelow = false;
    }

    Draw(ctx) {
        if (!lightingEnabled) return ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

        let airLeft = this.#checkLeft ? !World.blockAtPosition[this.#worldPosY][this.#worldPosX - 1] : false;
        let airRight = this.#checkRight ? !World.blockAtPosition[this.#worldPosY][this.#worldPosX + 1] : false;

        let airAbove = this.#checkAbove ? !World.blockAtPosition[this.#worldPosY - 1][this.#worldPosX] : false;
        let airBelow = this.#checkBelow ? !World.blockAtPosition[this.#worldPosY + 1][this.#worldPosX] : false;

        let nextToAir = (airLeft || airRight || airAbove || airBelow);
        if (nextToAir) return ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Grass extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, "grass", Images.blocks.grass);
    }
}

class Dirt extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, "dirt", Images.blocks.dirt);
    }
}

class Stone extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, "stone", Images.blocks.stone);
    }
}

class Coal extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, "coal", Images.blocks.coal);
    }
}

class Iron extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, "iron", Images.blocks.iron);
    }
}

class Sapphire extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, "sapphire", Images.blocks.sapphire);
    }
}

class Bedrock extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, "bedrock", Images.blocks.bedrock);
    }
}

const Ores = [ "coal", "iron", "sapphire" ];

const OreRanges = {
    coal: {
        min: 0,
        max: worldHeight - 20
    },

    iron: {
        min: 0,
        max: worldHeight - 10
    },

    sapphire: {
        min: worldHeight - 10,
        max: worldHeight
    }
}

const OreChances = {
    coal: 20,
    iron: 40,
    sapphire: 100
}

const BlockDurability = {
    grass: 5,
    dirt: 5,
    stone: 20,
    coal: 30,
    iron: 30,
    sapphire: 40
}