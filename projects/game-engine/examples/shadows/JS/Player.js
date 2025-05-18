class Player extends UpdatesEachFrame {
    speed = 400;
    jumpPower = 800;

    constructor(position, scene) {
        super();

        this.startPosition = position.copy();

        this.GameObject = new GameObject(position, new Vector(50, 100));
        this.GameObject.colour = "red";

        scene.Add(this.GameObject);
    }

    Update(delta) {
        this.GameObject.velocity.x = Input.GetAxisRaw("Horizontal") * this.speed;

        if (Input.GetAxisRaw("Vertical") > 0 && this.GameObject.collision.below) this.GameObject.velocity.y = -this.jumpPower;
    
        if (this.GameObject.position.y > 1800) this.GameObject.position = this.startPosition.copy();
    }
}