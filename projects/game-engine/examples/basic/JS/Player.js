const Player = new class extends UpdatesEachFrame {
    speed = 500;
    jumpPower = 800;

    constructor() {
        super();

        this.GameObject = new GameObject(new Vector(935, 780), new Vector(50, 100));
        this.GameObject.colour = "red";
    }

    AddToScene(scene) {
        scene.Add(this.GameObject);
    }

    Update(delta) {
        this.GameObject.velocity.x = Input.GetAxisRaw("Horizontal") * this.speed;

        let grounded = this.GameObject.collision.below;

        if (Input.GetAxisRaw("Vertical") > 0 && grounded) {
            this.GameObject.velocity.y = -this.jumpPower;
        }
    }
}