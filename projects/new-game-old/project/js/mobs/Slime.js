sprites = {
    idle: [
        new Image()
    ],

    jump: [
        new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()
    ],

    land: [
        new Image(), new Image(), new Image()
    ]
}

sprites.idle[0].src = "assets/textures/slime/left_idle.png";

sprites.jump[0].src = "assets/textures/slime/left_jump_0.png";
sprites.jump[1].src = "assets/textures/slime/left_jump_1.png";
sprites.jump[2].src = "assets/textures/slime/left_jump_0.png";
sprites.jump[3].src = "assets/textures/slime/left_idle.png";
sprites.jump[4].src = "assets/textures/slime/left_jump_2.png";
sprites.jump[5].src = "assets/textures/slime/left_jump_3.png";
sprites.jump[6].src = "assets/textures/slime/left_jump_2.png";

sprites.land[0].src = "assets/textures/slime/left_jump_0.png";
sprites.land[1].src = "assets/textures/slime/left_jump_1.png";
sprites.land[2].src = "assets/textures/slime/left_jump_0.png";

class Slime extends Entity {
    #range = 10;
    
    constructor(position) {
        super(position, animations, "Slime", 300, 720);
    }

    Update(delta) {

    }
}