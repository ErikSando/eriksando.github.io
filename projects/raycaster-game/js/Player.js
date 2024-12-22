class Player extends UpdatesEachFrame {
    speed = 100;
    arrowSensitivity = 1.5;
    sensitivity = 100;

    yVel = 0;
    terminalVel = -1500;
    jumpPower = 1500;

    constructor(position) {
        super();

        Game.camera.position = position;

        Input.MouseMove.AddListener((info) => {
            if (document.pointerLockElement == Game.GetCanvas()) {
                Game.camera.orientation += info.movement.x * this.sensitivity * 0.000006;
            }
        });

        Input.KeyDown.AddListener((keyCode) => {
            if (keyCode == KeyCode.ShiftRight) {
                let canvas = Game.GetCanvas();

                if (document.pointerLockElement == canvas) document.exitPointerLock();
                else canvas.requestPointerLock();
            }
        });
    }

    Update(delta) {
        let movementH = Input.GetAxisRaw("Horizontal");
        let movementV = Input.GetAxisRaw("Vertical");
        
        let direction = Game.camera.direction.forward().multiplied(movementV).plus(Game.camera.direction.right().multiplied(movementH));
        direction.z = 0;

        Game.camera.position.add(direction.normalised.multiplied(this.speed * delta));

        Game.camera.position.x = Clamp(Game.camera.position.x, TileSize + 0.1, (Game.scene.TileMap.length - 1) * TileSize - 0.1);
        Game.camera.position.y = Clamp(Game.camera.position.y, TileSize + 0.1, (Game.scene.TileMap[0].length - 1) * TileSize - 0.1);

        //let rotation = 0;

        //if (Input.GetKey(KeyCode.ArrowLeft)) rotation--;
        //if (Input.GetKey(KeyCode.ArrowRight)) rotation++;

        //Game.camera.orientation += rotation * this.arrowSensitivity * delta;
        
        while (Game.camera.orientation < 0) Game.camera.orientation += TwoPI;
        while (Game.camera.orientation > TwoPI) Game.camera.orientation -= TwoPI;

        let grounded = Game.camera.position.z <= 0;

        if (Input.GetKey("Space") && grounded) {
            this.yVel = this.jumpPower;
        }

        if (this.yVel > this.terminalVel) {
            this.yVel -= Game.Settings.Gravity;
            if (this.yVel < this.terminalVel) this.yVel = this.terminalVel;
        }

        Game.camera.position.z += this.yVel;
        if (Game.camera.position.z < 0) Game.camera.position.z = 0;

        //if (Input.GetKey(KeyCode.KeyQ)) Game.camera.position.z += this.speed * delta * 250;
        //if (Input.GetKey(KeyCode.KeyE)) Game.camera.position.z -= this.speed * delta * 250;
    }
}