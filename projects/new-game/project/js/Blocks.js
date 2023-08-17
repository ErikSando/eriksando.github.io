class Block {
    scale = Vector(Game.tileSize, Game.tileSize);

    constructor(position = Vector.zero, ID, image) {
        this.position = position;
        this.ID = ID;
        this.image = image;
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.scale.x;
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.scale.y;
    }

    Draw(ctx) {
        ctx.drawImage(this.image, this.position.x - Game.Camera.position.x, this.position.y - Game.Camera.position.y);
    }
}

class AnimatedBlock {
    constructor(position = Vector.zero, ID, animation) {
        this.position = position;
        this.ID = ID;
        this.animation = animation;
        this.image = this.animation.GetImage();
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.scale.x;
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.scale.y;
    }

    Update(delta) {
        this.image = this.animation.GetImage();
        this.animation.Update(delta);
    }

    Draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x - Game.Camera.position.x,
            this.position.y - Game.Camera.position.y
        );
    }
}

let bg_brick = new Image();
bg_brick.src = "assets/textures/blocks/bg_brick.png";

class BG_Brick extends Block {
    constructor(position) {
        super(position, "BG_Brick", bg_brick);
    }
}

let brick = new Image();
brick.src = "assets/textures/blocks/brick.png";

class Brick extends Block {
    constructor(position) {
        super(position, "Brick", brick);
    }
}

let spikes = new Image();
spikes.src = "assets/textures/blocks/spikes.png";

class Spikes extends Block {
    constructor(position) {
        super(position, "Spikes", spikes);
    }
}

let torch_0 = new Image();
let torch_1 = new Image();
torch_0.src = "assets/textures/blocks/torch_0.png";
torch_1.src = "assets/textures/blocks/torch_1.png";

class Torch extends AnimatedBlock {
    constructor(position) {
        let animation = new _Animation([torch_0, torch_1]);
        animation.fps = 1 + (Math.random() - 0.5) / 2;

        super(position, "Torch", animation);
    }
}

let lava_0 = new Image();
let lava_1 = new Image();
lava_0.src = "assets/textures/blocks/lava_0.png";
lava_1.src = "assets/textures/blocks/lava_1.png";

class Lava extends AnimatedBlock {
    constructor(position) {
        let animation = new _Animation([lava_0, lava_1]);
        animation.fps = 0.5;

        super(position, "Lava", animation);

        this.scale = Vector(64, 40);
    }
}

let portal = new Image();
portal.src = "assets/textures/blocks/portal.png";

class Portal extends Block {
    constructor(position) {
        super(position, "Portal", portal);

        this.scale = Vector(64, 128);
    }
}