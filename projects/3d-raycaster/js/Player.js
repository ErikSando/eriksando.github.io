class Player extends UpdatesEachFrame {
    speed = 60;

    sensitivity = 1.5;

    constructor(position) {
        super();

        Game.camera.position = position;
    }

    Update(delta) {
        let movementH = Input.GetAxisRaw("Horizontal");
        let movementV = Input.GetAxisRaw("Vertical");
        
        let direction = Game.camera.direction.forward().multiplied(movementV).plus(Game.camera.direction.right().multiplied(movementH));
        direction.z = 0;

        Game.camera.position.add(direction.normalised.multiplied(this.speed * delta));

        let rotation = 0;

        if (Input.GetKey(KeyCode.ArrowLeft)) rotation--;
        if (Input.GetKey(KeyCode.ArrowRight)) rotation++;

        Game.camera.orientation += rotation * this.sensitivity * delta;

        if (Input.GetKey(KeyCode.KeyQ)) Game.camera.position.z += this.speed * delta * 250;
        if (Input.GetKey(KeyCode.KeyE)) Game.camera.position.z -= this.speed * delta * 250;
    }
}